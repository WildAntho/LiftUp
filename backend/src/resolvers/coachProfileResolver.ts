import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CoachProfile } from "../entities/coachProfile";
import { CtxUser } from "../InputType/coachType";
import { CoachProfileInput } from "../InputType/coachProfileType";
import { User } from "../entities/user";

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
  async addCoachProfile(
    @Arg("data") data: CoachProfileInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        coachProfile: true,
      },
    });
    if (!coach) throw new Error("Aucun utilisateur n'a été trouvé");
    const newProfile = new CoachProfile();
    if (data.name) newProfile.name = data.name;
    if (data.description) newProfile.description = data.description;
    if (data.specialisation) newProfile.specialisation = data.specialisation;
    newProfile.facebook = data.facebook;
    newProfile.instagram = data.instagram;
    newProfile.linkedin = data.linkedin;

    await newProfile.save();
    coach.coachProfile = newProfile;
    await coach.save();
    return JSON.stringify("Le profil a bien été créé");
  }

  @Authorized("COACH")
  @Mutation(() => String)
  async updateCoachProfile(
    @Arg("data") data: CoachProfileInput,
    @Arg("id") id: string
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
