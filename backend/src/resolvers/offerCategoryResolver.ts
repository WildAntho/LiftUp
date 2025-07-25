import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { OfferCategory } from "../entities/offerCategory";

@Resolver(OfferCategory)
export class OfferCategoryResolver {
  @Authorized("ADMIN")
  @Mutation(() => String)
  async addCategory(@Arg("label") label: string) {
    const newCategory = new OfferCategory();
    newCategory.label = label;
    await newCategory.save();
    return JSON.stringify("Nouvelle catégorie d'offre créée");
  }

  @Authorized()
  @Query(() => [OfferCategory])
  async getAllCategories() {
    const categories = await OfferCategory.find();
    return categories;
  }
}
