import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CoachProfile } from "../entities/coachProfile";
import { CtxUser } from "../InputType/coachType";
import { CoachProfileInput } from "../InputType/coachProfileType";
import { updateProgress } from "../services/progressService";

@Resolver(CoachProfile)
export class CoachProfileResolver {
  @Authorized("COACH")
  @Query(() => CoachProfile)
  async getCoachProfile(@Ctx() context: { user: CtxUser }) {
    const profile = await CoachProfile.findOne({
      where: { user: { id: context.user.id } },
      relations: { user: true },
    });
    if (!profile)
      throw new Error("Aucun profil n'a été trouvé pour cet utilisateur");
    return profile;
  }

  @Authorized("COACH")
  @Mutation(() => String)
  async updateCoachProfile(
    @Arg("data") data: CoachProfileInput,
    @Arg("id") id: string,
    @Ctx() context: { user: CtxUser }
  ) {
    const profile = await CoachProfile.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!profile) throw new Error("Aucun profil n'a été trouvé");
    if (data.name) profile.name = data.name;
    if (data.description) profile.description = data.description;
    if (data.specialisation) profile.specialisation = data.specialisation;
    profile.facebook = data.facebook;
    profile.instagram = data.instagram;
    profile.linkedin = data.linkedin;
    await profile.save();
    await updateProgress(context.user.id, "profile");
    return JSON.stringify("Le profil a bien été mis à jour");
  }

  @Query(() => CoachProfile)
  async getOneCoachProfile(@Arg("id") id: string) {
    const profile = await CoachProfile.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: {
        user: true,
      },
    });
    return profile;
  }
}
