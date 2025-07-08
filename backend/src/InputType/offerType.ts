import { Field, InputType, registerEnumType } from "type-graphql";

export enum OfferStatus {
  AVAILABLE = "AVAILABLE",
  CANCEL = "CANCEL",
}

registerEnumType(OfferStatus, {
  name: "OfferStatus",
  description: "Statut des offres",
});

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
