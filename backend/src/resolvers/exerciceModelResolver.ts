import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ExerciceModel } from "../entities/exerciceModel";
import { ExerciceModelData } from "../InputType/exerciceModelType";
import { ILike } from "typeorm";
import { CtxUser } from "../InputType/coachType";
import { User } from "../entities/user";
import { dataSource } from "../config/db";

@Resolver(ExerciceModel)
export class ExerciceModelResolver {
  @Query(() => [ExerciceModel])
  async getAllExercicesModel(
    @Ctx() context: { user: CtxUser },
    @Arg("id", { nullable: true }) id?: string,
    @Arg("input", { nullable: true }) input?: string,
    @Arg("getFavorite", { nullable: true }) getFavorite?: boolean,
    @Arg("primary", { nullable: true }) primary?: string,
    @Arg("secondary", { nullable: true }) secondary?: string
  ) {
    const query = ExerciceModel.createQueryBuilder("exercice")
      .leftJoinAndSelect("exercice.user", "user")
      .leftJoinAndSelect("exercice.primaryMuscle", "primaryMuscle")
      .leftJoinAndSelect("exercice.secondaryMuscle", "secondaryMuscle");

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

    if (primary) {
      query.andWhere("primaryMuscle.id = :primaryMuscleId", {
        primaryMuscleId: primary,
      });
    }

    if (secondary) {
      query.andWhere("secondaryMuscle.id = :secondaryMuscleId", {
        secondaryMuscleId: secondary,
      });
    }

    const exerciceModels = await query.getMany();
    return exerciceModels;
  }

  @Mutation(() => String)
  async createExerciceModel(@Arg("data") data: ExerciceModelData) {
    const newModel = new ExerciceModel();
    newModel.rep = data.rep;
    newModel.serie = data.serie;
    newModel.title = data.title;
    newModel.notes = data.notes;
    newModel.intensity = data.intensity;
    newModel.weight = data.weight;
    await newModel.save();
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
}
