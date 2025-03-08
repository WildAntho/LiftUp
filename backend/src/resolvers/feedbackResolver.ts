import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Feedback } from "../entities/feedback";
import {
  FeedbackData,
  FeedbackWithoutTrainingId,
} from "../InputType/feedbackType";
import { Training } from "../entities/training";
import { RangeDate } from "../InputType/trainingType";
import { Between } from "typeorm";

@Resolver(Feedback)
export class FeedbackResolver {
  @Query(() => [Feedback])
  async getFeedbacks(
    @Arg("id") id: string,
    @Arg("rangeDate") rangeDate: RangeDate
  ) {
    const feedbacks = await Feedback.find({
      where: {
        training: {
          date: Between(rangeDate.startDate, rangeDate.endDate),
          user: {
            id,
          },
        },
      },
      relations: {
        training: true,
      },
    });
    return feedbacks;
  }

  @Mutation(() => String)
  async addFeedback(@Arg("data") feedbackData: FeedbackData) {
    const training = await Training.findOne({
      where: {
        id: feedbackData.trainingId,
      },
    });
    if (!training) throw new Error("Pas d'entraînement pour cet ID");
    const newFeedback = new Feedback();
    newFeedback.title = training.title;
    newFeedback.date = training.date;
    newFeedback.intensity = feedbackData.intensity;
    newFeedback.feeling = feedbackData.feeling;
    newFeedback.comment = feedbackData.comment;
    newFeedback.training = training;
    await newFeedback.save();
    training.validate = true;
    await training.save();
    return JSON.stringify("Le feedback a bien été enregistré");
  }

  @Mutation(() => String)
  async deleteFeedback(@Arg("id") id: string) {
    const feedback = await Feedback.findOne({
      where: { id },
      relations: {
        training: true,
      },
    });
    const training = await Training.findOneBy({ id: feedback?.training.id });
    if (feedback && training) {
      training.validate = false;
      training.save();
      feedback.remove();
      return JSON.stringify("Le feedback a bien été supprimé");
    }
  }
  @Mutation(() => String)
  async updateFeedback(
    @Arg("data") feedbackData: FeedbackWithoutTrainingId,
    @Arg("id") id: string
  ) {
    const feedback = await Feedback.findOneBy({ id });
    if (feedback) {
      feedback.feeling = feedbackData.feeling;
      feedback.intensity = feedbackData.intensity;
      feedback.comment = feedbackData.comment;
      await feedback.save();
      return JSON.stringify("Le feedback a bien été modifié");
    }
  }
}
