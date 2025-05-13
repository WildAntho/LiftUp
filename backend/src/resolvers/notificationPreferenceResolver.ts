import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { NotificationPreference } from "../entities/notificationPreference";
import { CtxUser } from "../InputType/coachType";
import { NotificationType } from "../InputType/notificationType";

@Resolver(NotificationPreference)
export class NotificationPreferenceResolver {
  @Query(() => NotificationPreference)
  async getPreferenceNotification(@Ctx() context: { user: CtxUser }) {
    const preference = await NotificationPreference.findOne({
      where: { user: { id: context.user.id } },
      relations: { user: true },
    });
    return preference;
  }

  @Mutation(() => String)
  async updatePreferenceNotification(
    @Arg("data", () => [NotificationType]) data: NotificationType[],
    @Ctx() context: { user: CtxUser }
  ) {
    const preference = await NotificationPreference.findOne({
      where: { user: { id: context.user.id } },
      relations: { user: true },
    });
    if (!preference)
      throw new Error(
        "Aucune préférence de notification n'existe pour cet utilisateur"
      );
    preference.disabledTypes = data;
    await preference.save();
    return "Les préférences de notifications ont bien été mis à jour";
  }
}
