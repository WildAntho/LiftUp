import * as argon from "argon2";
import { setDataSource } from "typeorm-extension";
import { User } from "../../entities/user";
import { dataSource } from "../db";
import { UserRole } from "../../InputType/userType";
import { Profile } from "../../entities/profile";
import { Permission } from "../../entities/permission";

const seedDatabase = async () => {
  await dataSource.initialize();
  console.log("Connected to database. Seeding data...");
  setDataSource(dataSource);

  try {
    // clear existing data
    await dataSource.getRepository(User).delete({});
    await dataSource.getRepository(Permission).delete({});
    await dataSource.getRepository(Profile).delete({});

    // create permission
    const permission = new Permission();
    permission.key = "manage:Program";
    permission.description = "Peut créer, modifier et supprimer des programmes";
    await permission.save();

    // create profile
    const profile = new Profile();
    profile.name = 'Coach-Maestro'
    profile.permissions = [];
    profile.permissions.push(permission);
    await profile.save();

    // create users
    const user = new User();
    const hashedPassword = await argon.hash("UserTest2025!");
    user.password = hashedPassword;
    user.firstname = "User";
    user.lastname = "Test";
    user.email = "user.test@gmail.com";
    user.password = hashedPassword;
    user.roles = [];
    user.roles.push(UserRole.COACH);
    user.profile = profile;
    await user.save();
    console.log("💪 Users seeded !");
  } catch (error) {
    console.error("💩 Error seeding database:", error);
  }
};

seedDatabase();
