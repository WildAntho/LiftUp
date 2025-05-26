import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { ProgressSession } from "../entities/progressSession";
import { CtxUser } from "../InputType/coachType";

@InputType()
class progressInput {
  @Field()
  id!: string;

  @Field({ nullable: true })
  profile?: boolean;

  @Field({ nullable: true })
  training?: boolean;

  @Field({ nullable: true })
  program?: boolean;

  @Field({ nullable: true })
  offer?: boolean;

  @Field({ nullable: true })
  searchCoach?: boolean;

  @Field({ nullable: true })
  searchProgram?: boolean;
}

@Resolver()
export class DashboardResolver {
  @Query(() => ProgressSession)
  async getProgress(@Ctx() context: { user: CtxUser }) {
    const progress = await ProgressSession.findOne({
      where: {
        user: {
          id: context.user.id,
        },
      },
      relations: { user: true },
    });
    return progress;
  }

  @Mutation(() => String)
  async updateProgress(@Arg("data") data: progressInput) {
    const progress = await ProgressSession.findOne({
      where: {
        id: data.id,
      },
    });
    if (!progress) throw new Error("Aucune progression n'a été trouvée");
    if (data.offer) progress.offer = data.offer;
    if (data.profile) progress.profile = data.profile;
    if (data.program) progress.program = data.program;
    if (data.searchCoach) progress.searchCoach = data.searchCoach;
    if (data.searchProgram) progress.searchProgram = data.searchProgram;
    if (data.training) progress.training = data.training;
    await progress.save();
    return "La progression a été mis à jour avec succès";
  }
}
