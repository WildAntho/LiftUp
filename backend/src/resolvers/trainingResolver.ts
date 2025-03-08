import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Training } from "../entities/training";
import { User } from "../entities/user";
import {
  RangeDate,
  TrainingData,
  UpdateTrainingData,
} from "../InputType/trainingType";
import { Between } from "typeorm";
import { CtxUser } from "../InputType/coachType";
import { createTrainingsForDates } from "../utils/utils";
import { Feedback } from "../entities/feedback";
import { Crew } from "../entities/crew";

@Resolver(Training)
export class TrainingResolver {
  @Query(() => [Training])
  async getTrainingsById(
    @Arg("id") id: string,
    @Arg("rangeDate") rangeDate: RangeDate
  ) {
    const userCrew = await Crew.findOne({
      where: {
        students: {
          id,
        },
      },
      relations: {
        students: true,
      },
    });
    const trainings = await Training.find({
      where: [
        { date: Between(rangeDate.startDate, rangeDate.endDate), user: { id } },
        ...(userCrew
          ? [
              {
                date: Between(rangeDate.startDate, rangeDate.endDate),
                crew: { id: userCrew.id },
              },
            ]
          : []),
      ],
      relations: {
        user: true,
        crew: true,
        exercices: {
          type: true,
        },
      },
    });
    return trainings;
  }

  @Query(() => Training)
  async getOneTraining(@Arg("id") id: string) {
    const training = await Training.findOneBy({ id });
    return training;
  }

  @Mutation(() => String)
  async addTraining(@Arg("data") data: TrainingData) {
    const user = await User.findOne({
      where: { id: data.id },
      relations: { trainings: true },
    });
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    if (!data.date || data.date.length === 0) {
      throw new Error("Aucune date fournie");
    }

    // Création des entraînements sans la propriété createdByCoach
    const trainings = await createTrainingsForDates(data.date, data, user);

    return JSON.stringify(
      `${trainings.length} entraînements ont été créés avec succès`
    );
  }

  @Mutation(() => String)
  async updateTraining(
    @Arg("data") data: UpdateTrainingData,
    @Ctx() context: { user: CtxUser }
  ) {
    const user = await User.findOneBy({ id: context.user.id });
    const training = await Training.findOneBy({ id: data.id });
    if (user && training) {
      if (training.editable === false && user.roles === "STUDENT")
        throw new Error("Vous ne pouvez pas éditer cet entraînement");
      if (data.title) training.title = data.title;
      if (data.date) training.date = data.date;
      if (data.notes) training.notes = data.notes;
      training.editable = data.editable ?? true;
      await training.save();
      const feedback = await Feedback.findOne({
        where: { training: { id: data.id } },
        relations: {
          training: true,
        },
      });
      if (feedback && data.date) {
        feedback.date = data.date;
        await feedback.save();
      }
    }
    return JSON.stringify("L'entraînement a bien été modifié");
  }

  @Mutation(() => String)
  async deleteTraining(@Arg("id") id: string) {
    const training = await Training.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (training !== null) {
      training.remove();
      return JSON.stringify("L'entraînement a bien été supprimé");
    }
  }
}
