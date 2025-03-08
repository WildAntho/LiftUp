import { Field, InputType } from "type-graphql";

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
  roles!: string;

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

  @Field({ nullable: true})
  avatar?: string
}
