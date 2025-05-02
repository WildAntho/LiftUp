import { Field, Float, InputType, registerEnumType } from "type-graphql";

export enum ScopeExercice {
  CALENDAR = "CALENDAR",
  PROGRAM = "PROGRAM",
}

registerEnumType(ScopeExercice, {
  name: "Scope",
  description: "Scope de la provenance d'un exercice",
});

@InputType()
class Config {
  @Field({ nullable: true })
  intensity?: number;

  @Field({ nullable: true })
  rep?: number;

  @Field({ nullable: true })
  serie?: number;
}

@InputType()
export class ExerciceData {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title!: string;

  @Field()
  serie!: number;

  @Field()
  rep!: number;

  @Field({ nullable: true })
  intensity?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  position?: number;


  @Field({ nullable: true })
  config?: Config;
}
