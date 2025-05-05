import { Field, Float, InputType, registerEnumType } from "type-graphql";

export enum ScopeExercice {
  CALENDAR = "CALENDAR",
  PROGRAM = "PROGRAM",
}

registerEnumType(ScopeExercice, {
  name: "ScopeExercice",
  description: "Scope de la provenance d'un exercice",
});

export enum IntensityFormat {
  RPE = "RPE",
  RIR = "RIR",
}

registerEnumType(IntensityFormat, {
  name: "IntensityFormat",
  description: "Format d'intensité",
});

export enum WeightFormat {
  KG = "KG",
  LBS = "LBS",
  PERCENTAGE = "PERCENTAGE", // % of 1RM
  BODYWEIGHT = "BODYWEIGHT",
  CHOICE = "CHOICE", // Choose your weight
}

registerEnumType(WeightFormat, {
  name: "WeightFormat",
  description: "Format de poids",
});

export enum RepFormat {
  STANDARD = "STANDARD", // juste un nombre
  AMRAP = "AMRAP", // As Many Reps As Possible
  TIME = "TIME", // Time to hold
  EMOM = "EMOM",
  E2MOM = "E2MOM",
}

registerEnumType(RepFormat, {
  name: "RepFormat",
  description: "Format de répétions",
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
  tempo?: number;

  @Field({ nullable: true })
  repFormat?: RepFormat;

  @Field({ nullable: true })
  weightFormat?: WeightFormat;

  @Field({ nullable: true })
  intensityFormat?: IntensityFormat;

  @Field({ nullable: true })
  config?: Config;
}
