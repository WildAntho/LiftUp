import { Authorized, Query, Resolver } from "type-graphql";
import { MuscleGroup } from "../entities/muscleGroup";

@Authorized()
@Resolver(MuscleGroup)
export class MuscleGroupResolver {
  @Query(() => [MuscleGroup])
  async getAllMuscleGroup() {
    const muscles = await MuscleGroup.find();
    return muscles;
  }
}
