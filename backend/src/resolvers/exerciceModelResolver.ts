import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ExerciceModel } from "../entities/exerciceModel";
import {
  ExerciceInfoResponse,
  ExerciceModelData,
  VideoType,
} from "../InputType/exerciceModelType";
import { CtxUser } from "../InputType/coachType";
import { User } from "../entities/user";
import { dataSource } from "../config/db";
import {
  buildResponseExercice,
  canGetExercice,
  saveExerciceModel,
} from "../services/exerciceModelService";
import { deleteFileFromS3, generateS3SignedUrl } from "../services/s3Service";
import { Exercice } from "../entities/exercice";
import { HasPermissionMethod } from "../middleware/hasPermissionMethod";

@Authorized()
@Resolver(ExerciceModel)
export class ExerciceModelResolver {
  @Query(() => [ExerciceModel])
  async getAllExercicesModel(
    @Ctx() context: { user: CtxUser },
    @Arg("id", { nullable: true }) id?: string,
    @Arg("input", { nullable: true }) input?: string,
    @Arg("getFavorite", { nullable: true }) getFavorite?: boolean,
    @Arg("muscles", () => [String], { nullable: true }) muscles?: string[],
    @Arg("category", { nullable: true }) category?: string
  ) {
    const query = ExerciceModel.createQueryBuilder("exercice")
      .leftJoinAndSelect("exercice.user", "user")
      .leftJoinAndSelect("exercice.muscles", "muscles")
      .leftJoinAndSelect("exercice.category", "category")
      .andWhere("(user.id = :userId OR user.id IS NULL)", {
        userId: context.user.id,
      });

    if (id) {
      query.andWhere("user.id = :id", { id });
    }

    if (input) {
      query.andWhere("unaccent(exercice.title) ILIKE unaccent(:input)", {
        input: `%${input}%`,
      });
    }

    if (getFavorite) {
      query
        .leftJoin("exercice.userFavorites", "userFavorites")
        .andWhere("userFavorites.id = :userId", { userId: context.user.id });
    }

    if (muscles && muscles.length > 0) {
      query.andWhere("muscles.id IN (:...muscles)", { muscles });
    }

    if (category) {
      query.andWhere("category.id = :category", { category });
    }

    query
      .orderBy(`CASE WHEN user.id IS NOT NULL THEN 0 ELSE 1 END`, "ASC")
      .addOrderBy("exercice.title", "ASC");

    const exerciceModels = await query.getMany();

    return exerciceModels;
  }

  @HasPermissionMethod(["manage:Exercice"])
  @Mutation(() => String)
  async createExerciceModel(
    @Ctx() context: { user: CtxUser },
    @Arg("data") data: ExerciceModelData
  ) {
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé pour cet id");
    await saveExerciceModel(data, user);
    return "L'exercice a bien été créé";
  }

  @Query(() => [String])
  async getFavoriteExercicesId(@Ctx() context: { user: CtxUser }) {
    const exercices = await ExerciceModel.find({
      where: {
        userFavorites: {
          id: context.user.id,
        },
      },
      select: ["id"],
      relations: ["userFavorites"],
    });

    return exercices.map((e) => e.id);
  }

  @Mutation(() => String)
  async addExerciceFavorite(
    @Arg("id") id: string,
    @Ctx() context: { user: CtxUser }
  ) {
    const exercice = await ExerciceModel.findOne({
      where: {
        id,
      },
    });
    const user = await User.findOne({
      where: { id: context.user.id },
      relations: { favoriteExercices: true },
    });
    if (!exercice) throw new Error("Aucun n'exercice ne correspond à cet id");
    if (!user) throw new Error("Aucun utilisateur ne correspond à cet id");
    const isFavorited = user.favoriteExercices?.some(
      (e) => e.id === exercice.id
    );
    if (isFavorited) {
      throw new Error("Cet exercice a déjà été marqué comme favoris");
    }
    user.favoriteExercices?.push(exercice);
    await user.save();
    return "L'exercice a bien été ajouté aux favoris";
  }

  @Mutation(() => String)
  async deleteExerciceFavorite(
    @Arg("id") id: string,
    @Ctx() context: { user: CtxUser }
  ) {
    const exercice = await ExerciceModel.findOne({
      where: {
        id,
      },
    });
    const user = await User.findOne({
      where: { id: context.user.id },
      relations: { favoriteExercices: true },
    });
    if (!exercice) throw new Error("Aucun n'exercice ne correspond à cet id");
    if (!user) throw new Error("Aucun utilisateur ne correspond à cet id");
    if (!user.favoriteExercices)
      throw new Error("Vous n'avez pas d'exercice en favoris");
    const isFavorited = user.favoriteExercices?.some(
      (e) => e.id === exercice.id
    );
    if (!isFavorited) {
      throw new Error("Cet exercice ne fait pas partie de vos favoris");
    }
    await dataSource
      .createQueryBuilder()
      .relation(User, "favoriteExercices")
      .of(user.id)
      .remove(exercice.id);
    return "L'exercice a bien été retiré des favoris";
  }

  @Query(() => ExerciceModel)
  async getOneExericeModel(
    @Ctx() context: { user: CtxUser },
    @Arg("id") id: string
  ) {
    const exercice = await ExerciceModel.findOne({
      where: { id },
      relations: {
        user: true,
        muscles: true,
      },
    });
    if (!exercice) throw new Error("Aucun exercice n'a été trouvé");
    if (!exercice.user || exercice.user.id !== context.user.id)
      throw new Error("Vous n'êtes pas autorisés à modifier cet exercice");
    return exercice;
  }

  @Query(() => ExerciceInfoResponse)
  async getExerciceInfo(
    @Ctx() context: { user: CtxUser },
    @Arg("id") id: string,
    @Arg("exerciceId", { nullable: true }) exerciceId: string
  ) {
    const connectedUser = await User.findOne({
      where: { id: context.user.id },
      relations: { coach: true },
    });
    if (!connectedUser) throw new Error("Aucun utilisateur n'a été trouvé");
    const exerciceModel = await ExerciceModel.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        muscles: true,
        category: true,
      },
    });
    if (!exerciceModel) throw new Error("Aucun exercice n'a été trouvé");
    const isOwnerOrStudent =
      exerciceModel.user && canGetExercice(connectedUser, exerciceModel.user);
    if (isOwnerOrStudent) return await buildResponseExercice(exerciceModel);
    const exercice = await Exercice.findOne({
      where: { exerciceModel: { id: exerciceId } },
      relations: {
        trainingPlan: true,
      },
    });
    if (!exercice) throw new Error("Aucun exercice lié n'a été trouvé");
    throw new Error("Vous n'avez pas accès à cette ressource");
  }

  @HasPermissionMethod(["manage:Exercice"])
  @Mutation(() => String)
  async deleteExerciceModel(
    @Ctx() context: { user: CtxUser },
    @Arg("id") id: string
  ) {
    const exerciceModel = await ExerciceModel.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!exerciceModel)
      throw new Error("Aucun modèle d'exercice n'a été trouvé");
    if (!exerciceModel.user)
      throw new Error("Impossible de supprimer un exercice générique");
    const canDelete = exerciceModel.user.id === context.user.id;
    if (!canDelete)
      throw new Error("Vous n'êtes pas autorisés à supprimer cette ressource");
    if (exerciceModel.videoType === VideoType.PERSO) {
      if (exerciceModel.video)
        await deleteFileFromS3(exerciceModel.video, context.user.id, true);
      if (exerciceModel.image)
        await deleteFileFromS3(exerciceModel.image, context.user.id, false);
    }
    await exerciceModel.remove();
    return "Le modèle d'exercice a bien été supprimé";
  }

  @HasPermissionMethod(["manage:Exercice"])
  @Mutation(() => String)
  async updateExerciceModel(
    @Ctx() context: { user: CtxUser },
    @Arg("data") data: ExerciceModelData,
    @Arg("deleteVideo", { nullable: true }) deleteVideo?: boolean,
    @Arg("addVideo", { nullable: true }) addVideo?: boolean
  ) {
    const exercice = await ExerciceModel.findOne({
      where: { id: data.id },
      relations: {
        user: true,
        muscles: true,
      },
    });
    if (!exercice) throw new Error("Aucun modèle d'exercice n'a été trouvé");
    if (!exercice.user)
      throw new Error("Impossible d'éditer un exercice générique");
    const canEdit = exercice.user.id === context.user.id;
    if (!canEdit)
      throw new Error("Vous n'êtes pas autorisés à éditer cette ressource");
    if (deleteVideo) {
      if (exercice.videoType === VideoType.PERSO) {
        if (exercice.video)
          await deleteFileFromS3(exercice.video, context.user.id, true);
        if (exercice.image)
          await deleteFileFromS3(exercice.image, context.user.id, false);
      }
      exercice.video = data.video;
      exercice.image = data.image;
      exercice.videoType = null;
      await exercice.save();
      return "La vidéo a bien été supprimée";
    }
    if (
      exercice.videoType === VideoType.PERSO &&
      data.videoType === VideoType.YOUTUBE
    ) {
      if (exercice.video)
        await deleteFileFromS3(exercice.video, context.user.id, true);
      if (exercice.image)
        await deleteFileFromS3(exercice.image, context.user.id, false);
    }
    await saveExerciceModel(data, undefined, exercice);
    return "Le modèle d'exercice a bien été mis à jour";
  }
}
