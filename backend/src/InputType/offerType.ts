import { Field, InputType } from "type-graphql";

@InputType()
export class OfferInput {
  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  description!: string;

  @Field()
  availability!: boolean;

  @Field()
  durability!: number;

  @Field()
  categoryId!: string;

  @Field({ nullable: true })
  crewId?: string;
}
