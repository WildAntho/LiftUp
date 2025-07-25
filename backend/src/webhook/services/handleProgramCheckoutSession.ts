import Stripe from "stripe";
import { UserProgram, UserProgramStatus } from "../../entities/userProgram";
import { TrainingPlan } from "../../entities/trainingPlan";
import { generateTraining } from "../../services/programService";
import { Profile } from "../../entities/profile";

// Service de gestion de génération de programme lorsque la session de paiement d'un programme est validée
export async function handleProgramCheckoutSession(
  session: Stripe.Checkout.Session
) {
  try {
    // On récupère l'id de la souscription au programme
    const programSubscriptionId = session.metadata?.programSubscriptionId;

    if (!programSubscriptionId) {
      console.warn(
        `[Webhook] programSubscriptionId manquant pour session ${session.id}`
      );
      return;
    }

    const subscription = await UserProgram.findOne({
      where: { id: programSubscriptionId },
      relations: ["user", "program", "coach"],
    });

    if (!subscription) {
      console.warn(
        `[Webhook] Aucune souscription UserProgram trouvée pour ID ${programSubscriptionId}`
      );
      return;
    }

    // On passe les statut à "payé"
    subscription.status = UserProgramStatus.PAID;
    subscription.paidAt = new Date();
    await subscription.save();


    // On récupère le profil student-maestro
    const profile = await Profile.findOneBy({ name: "Student-Maestro" });

    const user = subscription.user;
    const program = subscription.program;
    const coachId = subscription.coach?.id;
    const startDate = subscription.startDate;

    if (!user || !program || !coachId) {
      console.warn(
        `[Webhook] Données manquantes (user, program ou coach) pour souscription ${subscription.id}`
      );
      return;
    }

    if (!startDate) {
      console.warn(
        `[Webhook] Date de départ manquante pour souscription ${subscription.id}`
      );
      return;
    }

    // Génération des entraînements
    const trainings = await TrainingPlan.find({
      where: { program: { id: program.id } },
      relations: { program: true, exercices: true },
    });

    if (trainings.length === 0) {
      console.warn(
        `[Webhook] Aucun entraînement disponible pour le programme ${program.id}`
      );
      return;
    }

    // On assigne à l'utilisateur le profile student-maestro
    if (profile) user.profile = profile
    await user.save()

    try {
      await generateTraining(trainings, user, coachId, startDate);
      subscription.status = UserProgramStatus.COMPLETED;
      await subscription.save();
    } catch (genError) {
      console.error(
        `[Webhook] ❌ Erreur génération entraînements pour souscription ${subscription.id}:`,
        genError
      );
    }
  } catch (err) {
    console.error(
      `[Webhook] ❌ Erreur inattendue dans handleProgramCheckoutSession :`,
      err
    );
  }
}
