import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import {
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../entities/profileSubscription";
import { CtxUser } from "../InputType/coachType";
import { In } from "typeorm";

@Authorized()
@Resolver(ProfileSubscription)
export class ProfileSubscriptionResolver {
  @Query(() => ProfileSubscription)
  async getCurrentProfileSubscription(@Ctx() context: { user: CtxUser }) {
    const profileSubscription = await ProfileSubscription.findOne({
      where: {
        user: {
          id: context.user.id,
        },
        status: In([
          ProfileSubscriptionStatus.ACTIVE,
          ProfileSubscriptionStatus.SCHEDULE_CANCEL,
        ]),
      },
      order: {
        createdAt: "DESC",
      },
    });
    return profileSubscription;
  }
}
