import { Query, Resolver } from "type-graphql";
import { ExerciceType } from "../entities/exerciceType";

@Resolver(ExerciceType)
export class ExerciceTypeResolver {
  @Query(() => [ExerciceType])
  async getExerciceTypes() {
    const types = await ExerciceType.find();
    return types;
  }
}
