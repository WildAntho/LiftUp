import { Authorized, Query, Resolver } from "type-graphql";
import { ExerciceCategory } from "../entities/exerciceCategory";

@Authorized()
@Resolver(ExerciceCategory)
export class ExerciceCategoryResolver {
  @Query(() => [ExerciceCategory])
  async getExerciceCategories() {
    const categories = await ExerciceCategory.find({
      order: {
        id: "ASC",
      },
    });
    return categories;
  }
}
