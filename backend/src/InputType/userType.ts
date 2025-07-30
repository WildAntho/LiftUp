import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

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

@ObjectType()
export class ProfileOutput {
  @Field(() => String)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  monthlyAmount?: number;

  @Field({ nullable: true })
  yearlyAmount?: number;
}

@InputType()
export class UpdatePasswordInput {
  @Field()
  currentPassword!: string;

  @Field()
  newPassword!: string;

  @Field()
  confirmPassword!: string;
}
