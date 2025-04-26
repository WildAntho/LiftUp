import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Program } from "../entities/program";
import { ProgramInput, ProgramStatus } from "../InputType/programType";
import { CtxUser } from "../InputType/coachType";
import { User } from "../entities/user";

@Authorized("COACH")
@Resolver(Program)
export class ProgramResolver {
  @Query(() => [Program])
  async getPrograms(
    @Ctx() context: { user: CtxUser },
    @Arg("status", { nullable: true }) status?: ProgramStatus
  ) {
    const programs = await Program.find({
      where: {
        coach: {
          id: context.user.id,
        },
        status,
      },
    });
    return programs;
  }

  @Mutation(() => Program)
  async createProgram(
    @Arg("data") data: ProgramInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const coach = await User.findOne({
      where: {
        id: context.user.id,
      },
    });
    if (!coach) throw new Error("Aucun utilisateur n'a été trouvé");
    if (!coach) throw new Error("Aucune coach ne correspond");
    const program = new Program();
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    if (data.price) program.price = data.price;
    program.public = data.public;
    program.coach = coach;
    await program.save();
    return program;
  }

  @Mutation(() => String)
  async updateProgram(@Arg("data") data: ProgramInput, @Arg("id") id: string) {
    const program = await Program.findOne({
      where: {
        id,
      },
    });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.title = data.title;
    program.description = data.description;
    program.duration = data.duration;
    if (data.price) program.price = data.price;
    program.public = data.public;
    await program.save();
    return JSON.stringify("Les détails du programme ont été mis à jour");
  }

  @Mutation(() => String)
  async archiveProgram(@Arg("id") id: string) {
    const program = await Program.findOne({ where: { id } });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.status = ProgramStatus.ARCHIVED;
    await program.save();
    return "Le programme a été archivé avec succès";
  }

  @Mutation(() => String)
  async publishProgram(@Arg("id") id: string) {
    const program = await Program.findOne({ where: { id } });
    if (!program) throw new Error("Aucun programme n'a été trouvé");
    program.status = ProgramStatus.PUBLISHED;
    await program.save();
    return "Le programme a été validé avec succès";
  }
}
