import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { Between, ILike } from "typeorm";

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
}
