import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/user";
import { Membership } from "../entities/memberShip";
import { desactivateMemberShip } from "../services/coachService";
import isNotificationAllowed from "../services/notificationPreferenceService";
import { NotificationType } from "../InputType/notificationType";
import { createNotification } from "../services/notificationsService";
import { Program } from "../entities/program";
import {
  ProgramMarketplaceResponse,
  ProgramStatus,
} from "../InputType/programType";
import { UserProgram, UserProgramStatus } from "../entities/userProgram";
import { In, MoreThan } from "typeorm";
import { stripe } from "../config/stripe";
import { Crew } from "../entities/crew";
import { CtxUser } from "../InputType/coachType";
import { checkStripeCustomerId } from "../services/stripeService";

@Authorized("STUDENT")
@Resolver(User)
export class StudentResolver {
  @Query(() => [User])
  async selectCoach(
    @Arg("id") id: string,
    @Arg("input", { nullable: true }) input?: string,
    @Arg("price", () => [Number], { nullable: true }) price?: number[],
    @Arg("categorie", { nullable: true }) categorie?: string
  ) {
    const queryBuilder = User.createQueryBuilder("user")
      .leftJoinAndSelect("user.receivedRequests", "receivedRequests")
      .leftJoinAndSelect("receivedRequests.sender", "sender")
      .leftJoinAndSelect("user.sentRequests", "sentRequests")
      .leftJoinAndSelect("sentRequests.receiver", "receiver")
      .leftJoinAndSelect("user.coachProfile", "coachProfile")
      .leftJoinAndSelect("user.offers", "offers")
      .leftJoinAndSelect("offers.category", "category")
      .where("user.roles @> :role", { role: '["COACH"]' })
      .andWhere("coachProfile.profileVisible = :visible", { visible: true });

    // Ajouter des conditions de recherche par nom (firstname ou lastname)
    if (input) {
      queryBuilder.andWhere(
        "(user.firstname ILIKE :input OR user.lastname ILIKE :input)",
        { input: `%${input}%` }
      );
    }

    // Filtrer par catégorie d'offre
    if (categorie) {
      queryBuilder.andWhere("offers.category.id = :categorie", { categorie });
    }

    // Filtrer par prix (si un tableau de prix est fourni)
    if (price && price.length > 0) {
      const [minPrice, maxPrice] = price;
      queryBuilder.andWhere("offers.price BETWEEN :minPrice AND :maxPrice", {
        minPrice: minPrice ?? 0,
        maxPrice: maxPrice ?? Infinity,
      });
    }

    // Filtrer les utilisateurs en fonction des requêtes reçues et envoyées
    queryBuilder.andWhere((qb) => {
      const subQuery = qb
        .subQuery()
        .select("user.id")
        .from(User, "user")
        .leftJoin("user.receivedRequests", "receivedRequests")
        .leftJoin("user.sentRequests", "sentRequests")
        .where(
          "receivedRequests.sender.id = :id AND receivedRequests.status = :status",
          {
            id,
            status: "PENDING",
          }
        )
        .orWhere(
          "sentRequests.receiver.id = :id AND sentRequests.status = :status",
          {
            id,
            status: "PENDING",
          }
        )
        .getQuery();
      return `user.id NOT IN ${subQuery}`;
    });

    // Ordonner les résultats par prix des offres
    queryBuilder.orderBy("offers.price", "ASC");

    // Exécuter la requête et retourner les résultats
    const users = await queryBuilder.getMany();
    return users;
  }

  @Query(() => Crew)
  async getMyCrew(@Ctx() context: { user: CtxUser }) {
    const crew = await Crew.createQueryBuilder("crew")
      .leftJoinAndSelect("crew.students", "student")
      .leftJoinAndSelect("crew.coach", "coach")
      .where("student.id = :userId", { userId: context.user.id })
      .getOne();
    return crew;
  }

  @Query(() => [User])
  async getChatUsers(@Ctx() context: { user: User }) {
    const user = await User.findOne({
      where: { id: context.user.id },
      relations: {
        crew: {
          students: true,
        },
        coach: true,
      },
    });
    if (!user) throw new Error("Aucun utilisateur trouvé");
    const allUsers = [];
    if (user.crew?.students)
      allUsers.push(
        ...user.crew?.students.filter((user) => user.id !== context.user.id)
      );
    if (user.coach) allUsers.push(user.coach);

    return allUsers;
  }

  @Query(() => User || String)
  async getMyCoach(@Ctx() context: { user: User }) {
    const user = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: { coach: true },
    });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    if (!user.coach) return "Vous n'avez pas encore de coach";
    return user.coach;
  }

  @Query(() => Membership)
  async getMembership(@Ctx() context: { user: User }) {
    const membership = await Membership.findOne({
      where: {
        student: { id: context.user.id },
        isActive: true,
      },
      relations: {
        student: true,
        offer: true,
      },
    });
    return membership;
  }

  @Mutation(() => String)
  async cancelMembership(@Ctx() context: { pubsub: PubSub; user: User }) {
    const user = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        crew: true,
        coach: true,
      },
    });
    const memberShip = await Membership.findOne({
      where: {
        student: { id: context.user.id },
        isActive: true,
      },
    });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    if (!memberShip) throw new Error("Aucune souscription n'a été trouvée");
    if (!user.coach) throw new Error("Cet élève n'a aucun coach");
    const id = user.coach.id;
    await desactivateMemberShip(memberShip);
    user.coach = null;
    user.crew = null;
    await user.save();

    const allowedNotification = await isNotificationAllowed(
      NotificationType.CANCEL_MEMBERSHIP,
      id
    );
    if (allowedNotification) {
      const newNotification = await createNotification(
        "membership",
        memberShip.id,
        NotificationType.CANCEL_MEMBERSHIP,
        id
      );

      context.pubsub.publish("NEW_NOTIFICATION", {
        newNotification,
        topic: "NEW_NOTIFICATION",
      });
    }
    return "Votre souscription a bien été clôturée";
  }

  @Query(() => [Program])
  async getProgramsMarketPlace() {
    const programs = await Program.createQueryBuilder("program")
      .leftJoinAndSelect("program.category", "category")
      .leftJoinAndSelect("program.coach", "coach")
      .leftJoinAndSelect("coach.coachProfile", "coachProfile")
      .where("program.public = :isPublic", { isPublic: true })
      .andWhere("program.status = :status", { status: ProgramStatus.PUBLISHED })
      .andWhere("program.price > 0")
      .andWhere("coachProfile.programVisible = :visible", { visible: true })
      .getMany();

    return programs;
  }

  @Query(() => ProgramMarketplaceResponse)
  async getOneProgramMarketPlace(@Arg("id") id: string) {
    const program = await Program.findOne({
      where: {
        id,
        public: true,
        price: MoreThan(0),
      },
      relations: {
        category: true,
        coach: true,
        trainingPlans: true,
      },
    });

    return {
      program: program,
      trainingsCount: program?.trainingPlans.length,
    };
  }

  @Mutation(() => String)
  async subscribeProgram(
    @Arg("programId") programId: string,
    @Arg("coachId") coachId: string,
    @Arg("startDate") startDate: Date,
    @Arg("politic") politic: boolean,
    @Ctx() context: { pubsub: PubSub; user: User }
  ) {
    if (!politic)
      throw new Error("Merci de valider les conditions générales d'achat");
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) {
      throw new Error("Aucun utilisateur n'a été trouvé");
    }
    const program = await Program.findOneBy({ id: programId });
    if (!program) {
      throw new Error("Programme introuvable");
    }
    const coach = await User.findOne({
      where: { id: coachId },
      relations: { coachProfile: true },
    });
    if (!coach) {
      throw new Error("Aucun coach n'a été trouvé");
    }
    if (!program.public || !program.price) {
      throw new Error("Ce programme est privé");
    }
    if (!coach?.coachProfile?.stripeAccountId) {
      throw new Error("Le coach n’a pas de compte Stripe Connect.");
    }
    // Vérifie si une souscription existe déjà (pending)
    let programSubscription = await UserProgram.findOne({
      where: {
        user: { id: user.id },
        program: { id: program.id },
        status: In([UserProgramStatus.PENDING_PAYMENT]),
      },
    });

    const commissionRate = 0.15;

    if (!programSubscription) {
      // Crée la souscription si elle n'existe pas
      programSubscription = UserProgram.create({
        user,
        coach,
        program,
        status: UserProgramStatus.PENDING_PAYMENT,
        price: program.price || 0,
        startDate,
        commissionRate,
        currency: "eur",
      });
      await programSubscription.save();
    }

    const stripeCustomerId = await checkStripeCustomerId(user);

    // ✅ Toujours recalculer le Stripe Session pour cette souscription
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Programme : ${program.title}`,
            },
            unit_amount: program.price && Math.round(program.price * 100),
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      payment_intent_data: {
        metadata: {
          programSubscriptionId: programSubscription.id,
        },
        transfer_data: {
          destination: coach.coachProfile.stripeAccountId,
        },
        application_fee_amount: Math.round(
          program.price * commissionRate * 100
        ),
      },
      metadata: {
        programSubscriptionId: programSubscription.id,
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&refetch=true`,
      cancel_url: `${process.env.FRONTEND_URL}/marketplace/program/${programId}`,
    });

    // ✅ Mets à jour le Stripe Session ID chaque fois
    programSubscription.stripeSessionId = session.id;
    await programSubscription.save();

    return session.url!;
  }
}
