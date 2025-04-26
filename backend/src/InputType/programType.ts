import { Field, InputType, registerEnumType } from "type-graphql";

export enum ProgramStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

registerEnumType(ProgramStatus, {
  name: "ProgramStatus",
  description: "Le statut d'un programme (brouillon, publié, archivé)",
});

@InputType()
export class ProgramInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  duration!: number;

  @Field({ nullable: true })
  price?: number;

  @Field()
  public!: boolean;
}
