import { Field, InputType, registerEnumType } from "type-graphql";

export enum StatusStudent {
  active = "ACTIVE",
  waiting = "WAITING",
  end_7 = "END_7",
  expired = "EXPIRED",
}

registerEnumType(StatusStudent, {
  name: "StatusStudent",
  description: "Statut de la souscription",
});

@InputType()
export class ActiveMembershipType {
  @Field()
  studentId!: string;

  @Field()
  offerId!: string;
}
