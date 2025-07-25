import { Resolver, Query, Authorized } from "type-graphql";
import { Profile } from "../entities/profile";
import { Permission } from "../entities/permission";
import { User } from "../entities/user";

@Authorized("ADMIN")
@Resolver()
export class AdminResolver {
  @Query(() => [Profile])
  async getProfileAdmin() {
    const profiles = await Profile.find({
      relations: {
        permissions: true,
      },
    });
    return profiles;
  }

  @Query(() => [Permission])
  async getPermissionAdmin() {
    const permissions = await Permission.find();
    return permissions;
  }

  @Query(() => [User])
  async getUsers() {
    const users = await User.find({
      relations: {
        coach: true,
        profile: true
      },
    });
    return users;
  }
}
