import { In } from "typeorm";
import { ExerciceModel } from "../entities/exerciceModel";
import { MuscleGroup } from "../entities/muscleGroup";
import { User } from "../entities/user";
import { ExerciceModelData, VideoType } from "../InputType/exerciceModelType";
import { generateS3SignedUrl } from "./s3Service";
import { hasAnyRole } from "./userService";
import { UserRole } from "../InputType/userType";
import { ExerciceCategory } from "../entities/exerciceCategory";

export function canGetExercice(connectedUser: User, exerciceOwner: User) {
  const isConnectedUserCoach = hasAnyRole(connectedUser, [UserRole.COACH]);
  if (isConnectedUserCoach && connectedUser.id !== exerciceOwner.id)
    return false;
  if (connectedUser.id === exerciceOwner.id) return true;
  if (connectedUser.coach && connectedUser.coach.id === exerciceOwner.id)
    return true;
  return false;
}

export async function saveExerciceModel(
  data: ExerciceModelData,
  user?: User,
  exerciceToUpdate?: ExerciceModel
) {
  if (!user && !exerciceToUpdate) {
    throw new Error("Impossible de créer un exercice sans user");
  }

  const exercice = exerciceToUpdate ?? new ExerciceModel();

  const allMuscles = data.muscles?.length
    ? await MuscleGroup.findBy({ id: In(data.muscles) })
    : [];

  const category = await ExerciceCategory.findOneBy({
    id: data.category,
  });

  if (user) exercice.user = user;

  exercice.title = data.title;
  exercice.image = data.image;
  exercice.muscles = allMuscles;
  exercice.description = data.description;
  exercice.video = data.video;
  exercice.videoType = data.videoType;
  if (category) exercice.category = category;

  return await exercice.save();
}

export async function buildResponseExercice(exerciceModel: ExerciceModel) {
  let link = exerciceModel.video;
  if (
    exerciceModel.videoType === VideoType.PERSO &&
    exerciceModel.video &&
    exerciceModel.user
  ) {
    const { url } = await generateS3SignedUrl({
      fileName: exerciceModel.video,
      fileType: "video/mp4",
      userId: exerciceModel.user.id,
      type: "getObject",
    });
    link = url;

    return {
      link,
      description: exerciceModel.description,
      muscles: exerciceModel.muscles,
      category: exerciceModel.category,
      title: exerciceModel.title,
    };
  }
  return {
    link,
    description: exerciceModel.description,
    muscles: exerciceModel.muscles,
    category: exerciceModel.category,
    title: exerciceModel.title,
  };
}
