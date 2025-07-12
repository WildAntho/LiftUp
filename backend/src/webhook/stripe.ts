import { stripe } from "../config/stripe";
import { UserProgram, UserProgramStatus } from "../entities/userProgram";
import Stripe from "stripe";
import { Request, Response } from "express";
import { generateTraining } from "../services/programService";
import { TrainingPlan } from "../entities/trainingPlan";

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Signature Stripe invalide :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionId = session.metadata && session.metadata.subscriptionId;

    if (!subscriptionId)
      throw new Error("L'id de la souscription n'a pas été fourni");

    const subscription = await UserProgram.findOne({
      where: { id: subscriptionId },
      relations: ["user", "program", "coach"],
    });

    if (!subscription) throw new Error("Aucune souscription n'a été trouvée");
    subscription.status = UserProgramStatus.PAID;
    await subscription.save();

    try {
      const user = subscription.user;
      const program = subscription.program;
      const coachId = subscription.coach.id;
      const startDate = subscription.startDate;
      if (!user || !program) {
        throw new Error(
          "Utilisateur ou programme manquant dans la souscription"
        );
      }
      if (!startDate) {
        throw new Error("Aucune date de départ n'a été fourni");
      }
      const trainings = await TrainingPlan.find({
        where: { program: { id: program.id } },
        relations: { program: true, exercices: true },
      });
      if (trainings.length === 0) {
        throw new Error(
          "Aucun entraînement n'est disponible pour ce programme"
        );
      }
      await generateTraining(trainings, user, coachId, startDate);
      subscription.status = UserProgramStatus.COMPLETED;
      await subscription.save();
    } catch (err) {
      console.error("❌ Erreur génération entraînements :", err);
    }
  }
  res.status(200).json({ received: true });
};
