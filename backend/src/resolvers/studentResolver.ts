import { Arg, Ctx, Mutation, PubSub, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { Membership } from "../entities/memberShip";
import { Crew } from "../entities/crew";
import {
  deleteFromCrew,
  deleteStudent,
  desactivateMemberShip,
} from "../services/coachService";
import isNotificationAllowed from "../services/notificationPreferenceService";
import { NotificationType } from "../InputType/notificationType";
import { createNotification } from "../services/notificationsService";

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
      .where("user.roles = :role", { role: "COACH" });

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
}
