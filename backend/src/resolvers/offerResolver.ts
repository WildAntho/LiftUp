import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { OfferCategory } from "../entities/offerCategory";
import { Offer } from "../entities/offer";
import { CtxUser } from "../InputType/coachType";
import { OfferInput } from "../InputType/offerType";
import { User } from "../entities/user";
import { Crew } from "../entities/crew";

@Resolver(Offer)
export class OfferResolver {
  @Query(() => [Offer])
  async getCoachOffers(@Ctx() context: { user: CtxUser }) {
    const offers = await Offer.find({
      where: {
        user: {
          id: context.user.id,
        },
      },
      relations: {
        user: true,
        category: true,
        crew: true,
      },
      order: {
        price: "ASC",
      },
    });
    return offers;
  }

  @Mutation(() => String)
  async addOffer(
    @Arg("data") data: OfferInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const category = await OfferCategory.findOneBy({ id: data.categoryId });
    const user = await User.findOneBy({ id: context.user.id });
    const crew = await Crew.findOneBy({ id: data.crewId });
    const newOffer = new Offer();
    newOffer.name = data.name;
    newOffer.description = data.description;
    newOffer.price = data.price;
    newOffer.durability = data.durability;
    newOffer.availability = data.availability;
    if (user) newOffer.user = user;
    if (category) newOffer.category = category;
    if (crew) newOffer.crew = crew;
    await newOffer.save();
    return JSON.stringify("L'offre a bien été créée");
  }

  @Mutation(() => String)
  async updateOffer(@Arg("data") data: OfferInput, @Arg("id") id: string) {
    const category = await OfferCategory.findOneBy({ id: data.categoryId });
    const offer = await Offer.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
    if (!offer) throw new Error("Aucune offre ne correspond");
    offer.name = data.name;
    offer.description = data.description;
    offer.price = data.price;
    offer.durability = data.durability;
    offer.availability = data.availability;
    if (category) offer.category = category;
    await offer.save();
    return JSON.stringify("L'offre a bien été modifiée");
  }

  @Mutation(() => String)
  async deleteOffer(@Arg("id") id: string) {
    const offer = await Offer.findOneBy({ id });
    if (!offer) throw new Error("Aucune offre ne correspond");
    offer.remove();
    return JSON.stringify("L'offre a bien été supprimée");
  }

  @Query(() => [Offer])
  async getOneCoachOffers(@Arg("id") id: string) {
    const offers = await Offer.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        category: true,
      },
      order: {
        price: "ASC",
      },
    });
    return offers;
  }
}
