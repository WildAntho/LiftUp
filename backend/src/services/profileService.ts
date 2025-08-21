import { Profile } from "../entities/profile";
import { User } from "../entities/user";
import { invalidateUserTokens } from "./userService";

export async function deleteProfile(
  student: User,
  invalidateToken: boolean = false
) {
  student.profile = null;
  await student.save();
  if (invalidateToken) await invalidateUserTokens(student);
}

export async function giveProfile(user: User, profileName: string) {
  const profile = await Profile.findOneBy({ name: profileName });
  if (!profile) throw new Error("Aucun profil n'a été trouvé");
  user.profile = profile;
  await user.save();
}
