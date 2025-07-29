import { ProgressSession } from "../entities/progressSession";

type Target = "profile" | "training" | "program" | "offer" | "searchProgram" | "createConnect";

export async function updateProgress(userId: string, target: Target) {
  const progress = await ProgressSession.findOne({
    where: { user: { id: userId } },
  });
  if (progress && !progress[target]) {
    progress[target] = true;
    await progress?.save();
  }
}
