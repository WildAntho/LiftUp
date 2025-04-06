import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ExerciceModel } from "../entities/exerciceModel";
import {
  ExerciceModelData,
  ExerciceModelInput,
} from "../InputType/exerciceModelType";
import { ILike } from "typeorm";
import { ExerciceType } from "../entities/exerciceType";

@Resolver(ExerciceModel)
export class ExerciceModelResolver {
  @Query(() => [ExerciceModel])
  async getAllExercicesModel(
    @Arg("data", { nullable: true }) data?: ExerciceModelInput
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

  @Mutation(() => String)
  async createExerciceModel(@Arg("data") data: ExerciceModelData) {
    const type = await ExerciceType.findOneBy({ value: data.type?.value });
    const newModel = new ExerciceModel();
    newModel.rep = data.rep;
    newModel.serie = data.serie;
    newModel.title = data.title;
    newModel.notes = data.notes;
    newModel.intensity = data.intensity;
    newModel.weight = data.weight;
    if (type) newModel.type = type;
    await newModel.save()
  }
}
