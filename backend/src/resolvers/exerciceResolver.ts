import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Exercice } from "../entities/exercice";
import { ExerciceData, ScopeExercice } from "../InputType/exerciceType";
import { Training } from "../entities/training";
import { CreateMultipleExercicesFromModel } from "../services/exerciceService";
import { AddExercicePlanInput } from "../InputType/trainingPlanType";
import { TrainingPlan } from "../entities/trainingPlan";

@Resolver(Exercice)
export class ExerciceResolver {
  @Query(() => [Exercice])
  async getExercices(@Arg("id") trainingId: string) {
    const exercices = await Exercice.find({
      where: {
        training: {
          id: trainingId,
        },
      },
      relations: {
        training: true,
      },
    });
    return exercices;
  }

  @Mutation(() => Exercice)
  async updateExercice(
    @Arg("id") exerciceId: string,
    @Arg("data") data: ExerciceData
  ) {
    const exercice = await Exercice.findOneBy({ id: exerciceId });
    if (!exercice) throw new Error("Aucun exercice pour cet id");
    exercice.title = data.title;
    exercice.rep = data.rep;
    exercice.serie = data.serie;
    exercice.intensity = data.intensity;
    exercice.weight = data.weight;
    exercice.notes = data.notes;
    exercice.tempo = data.tempo;
    exercice.repFormat = data.repFormat;
    exercice.weightFormat = data.weightFormat;
    exercice.intensityFormat = data.intensityFormat;
    exercice.position = data.position;
    await exercice.save();
    return exercice;
  }

  @Mutation(() => String)
  async deleteExercice(@Arg("id") id: string) {
    const exercice = await Exercice.findOneBy({ id });
    if (!exercice) throw new Error("Aucun exercice pour cet id");
    exercice.remove();
    return "L'exercice a bien été supprimé";
  }

  @Mutation(() => String)
  async addExercice(
    @Arg("id") id: string,
    @Arg("exercices", () => [AddExercicePlanInput])
    exercices: AddExercicePlanInput[],
    @Arg("scope", () => ScopeExercice) scope: ScopeExercice
  ) {
    let training: Training | TrainingPlan | null = null;

    switch (scope) {
      case ScopeExercice.CALENDAR:
        training = await Training.findOne({
          where: { id },
          relations: { exercices: true },
        });
        break;
      case ScopeExercice.PROGRAM:
        training = await TrainingPlan.findOne({
          where: { id },
          relations: { exercices: true },
        });
        break;
      default:
        throw new Error("Scope invalide pour la création d'exercices.");
    }
    if (!training) throw new Error("Aucun entraînement n'a été trouvé");
    await CreateMultipleExercicesFromModel(exercices, training, scope);
    return exercices.length > 1
      ? "Les exercices ont bien été ajoutés"
      : "L'exercice a bien été ajouté";
  }
}
