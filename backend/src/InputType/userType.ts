import { Field, InputType, registerEnumType } from "type-graphql";

export enum UserRole {
  STUDENT = "STUDENT",
  COACH = "COACH",
  ADMIN = "ADMIN",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "Rôles utilisateurs",
});

@InputType()
export class UserInput {
  @Field()
  email!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  password!: string;

  @Field()
  roles!: UserRole;

  @Field({ nullable: true })
  sex?: "male" | "female";

  @Field()
  confirmedPassword!: string;
}

@InputType()
export class userLogin {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class UpdateProfile {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field({ nullable: true })
  sex?: "male" | "female";

  @Field({ nullable: true })
  avatar?: string;
}
