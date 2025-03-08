import { Arg, Query, Resolver } from "type-graphql";
import { ExerciceModel } from "../entities/exerciceModel";
import { ExerciceModelData } from "../InputType/exerciceModelType";
import { ILike } from "typeorm";

@Resolver(ExerciceModel)
export class ExerciceModelResolver {
  @Query(() => [ExerciceModel])
  async getAllExercicesModel(
    @Arg("data", { nullable: true }) data?: ExerciceModelData
  ) {
    const where: Record<string, any> = {};

    if (data && data.id) {
      where.user = { id: data.id };
    }

    if (data && data.input) {
      where.title = ILike(`%${data.input}%`);
    }
    const exerciceModels = await ExerciceModel.find({
      where,
      relations: {
        type: true,
        user: true,
      },
    });
    return exerciceModels;
  }
}
