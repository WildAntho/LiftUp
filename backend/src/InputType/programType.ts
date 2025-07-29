import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { Program } from "../entities/program";

export enum ProgramStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED"
}

registerEnumType(ProgramStatus, {
  name: "ProgramStatus",
  description: "Le statut d'un programme (brouillon, publié, archivé)",
});

export enum ProgramLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

registerEnumType(ProgramLevel, {
  name: "ProgramLevel",
  description: "Le niveau d'un programme (débutant, intermédiaire, avancé)",
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

  @Field({ nullable: true })
  level?: ProgramLevel;

  @Field({ nullable: true })
  categoryId?: string;

  @Field()
  public!: boolean;
}

@InputType()
export class UpdateProgramInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status!: ProgramStatus;

  @Field()
  duration!: number;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  level?: ProgramLevel;

  @Field({ nullable: true })
  categoryId?: string;

  @Field()
  public!: boolean;
}

@ObjectType()
export class ProgramMarketplaceResponse {
  @Field(() => Program)
  program!: Program;

  @Field()
  trainingsCount!: number;
}
