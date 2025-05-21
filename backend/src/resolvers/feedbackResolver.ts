import { Arg, Ctx, Mutation, PubSub, Query, Resolver } from "type-graphql";
import { Feedback } from "../entities/feedback";
import {
  FeedbackData,
  FeedbackWithoutTrainingId,
} from "../InputType/feedbackType";
import { Training } from "../entities/training";
import { RangeDate } from "../InputType/trainingType";
import { Between } from "typeorm";
import { CtxUser } from "../InputType/coachType";
import { User } from "../entities/user";
import { createNotification } from "../services/notificationsService";
import { NotificationType } from "../InputType/notificationType";
import isNotificationAllowed from "../services/notificationPreferenceService";

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
  async addFeedback(
    @Arg("data") feedbackData: FeedbackData,
    @Ctx() context: { pubsub: PubSub; user: CtxUser }
  ) {
    const training = await Training.findOne({
      where: {
        id: feedbackData.trainingId,
      },
      relations: {
        crew: true,
      },
    });

    if (!training) throw new Error("Pas d'entraînement pour cet ID");
    if (training.crew !== null)
      throw new Error(
        "Il n'est pas possible de renseigner un feedback pour un entrainement d'équipe"
      );
    const connectedUser = await User.findOne({
      where: { id: context.user.id },
      relations: { coach: true },
    });
    if (!connectedUser) throw new Error("Aucun utilisateur ne correspond");
    const newFeedback = new Feedback();
    newFeedback.title = training.title;
    newFeedback.date = training.date;
    newFeedback.intensity = feedbackData.intensity;
    newFeedback.feeling = feedbackData.feeling;
    newFeedback.satisfaction = feedbackData.satisfaction;
    newFeedback.comment = feedbackData.comment;
    newFeedback.training = training;
    newFeedback.user = connectedUser;
    await newFeedback.save();
    training.validate = true;
    await training.save();
    if (
      connectedUser.coach &&
      connectedUser?.coach.id.toString() === training.createdByCoach?.toString()
    ) {
      const allowedNotification = await isNotificationAllowed(
        NotificationType.NEW_FEEDBACK,
        connectedUser.coach.id
      );
      if (allowedNotification) {
        const newNotification = await createNotification(
          "feedback",
          newFeedback.id,
          NotificationType.NEW_FEEDBACK,
          connectedUser.coach.id
        );
        context.pubsub.publish("NEW_NOTIFICATION", {
          newNotification,
          topic: "NEW_NOTIFICATION",
        });
      }
    }
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
      feedback.satisfaction = feedbackData.satisfaction;
      feedback.comment = feedbackData.comment;
      await feedback.save();
      return JSON.stringify("Le feedback a bien été modifié");
    }
  }
}
