import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Exercice } from "../entities/exercice";
import { ExerciceData } from "../InputType/exerciceType";
import { Training } from "../entities/training";
import { ExerciceType } from "../entities/exerciceType";

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
        type: true,
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
    const type = await ExerciceType.findOneBy({ value: data.type?.value });
    if (!exercice) throw new Error("Aucun exercice pour cet id");
    exercice.title = data.title;
    exercice.rep = data.rep;
    exercice.serie = data.serie;
    if (data.intensity) exercice.intensity = data.intensity;
    if (data.weight) exercice.weight = data.weight;
    if (data.notes) exercice.notes = data.notes;
    exercice.position = data.position;
    if (type) exercice.type = type;
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

  @Mutation(() => Exercice)
  async addExercice(@Arg("id") id: string, @Arg("data") data: ExerciceData) {
    const training = await Training.findOne({
      where: { id },
      relations: { exercices: true },
    });
    const type = await ExerciceType.findOneBy({ value: data.type?.value });
    if (!training) throw new Error("Aucune entraînement correspond à cet id");
    const newExercice = new Exercice();
    newExercice.title = data.title;
    newExercice.rep = data.rep;
    newExercice.serie = data.serie;
    if (data.intensity) newExercice.intensity = data.intensity;
    if (data.weight) newExercice.weight = data.weight;
    if (data.notes) newExercice.notes = data.notes;
    if (type) newExercice.type = type;
    await newExercice.save();
    training.exercices?.push(newExercice);
    await training.save();
    return newExercice;
  }
}
