import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { Response } from "express";
import {
  ProfileOutput,
  UpdatePasswordInput,
  UpdateProfile,
  UserInput,
  userLogin,
} from "../InputType/userType";
import { CtxUser } from "../InputType/coachType";
import { passwordRegex } from "../services/userService";
import { Profile } from "../entities/profile";
import { In } from "typeorm";
import { stripe } from "../config/stripe";
import { checkStripeCustomerId } from "../services/stripeService";
import {
  Periodicity,
  ProfileSubscription,
  ProfileSubscriptionStatus,
} from "../entities/profileSubscription";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => String)
  async GetMe(@Ctx() context: { user: User }) {
    const user = await User.findOne({
      where: {
        id: context.user.id,
      },
      relations: {
        profile: true,
      },
    });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    return JSON.stringify({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      roles: user.roles,
      sex: user.sex,
      avatar: user.avatar,
      profile: user.profile,
    });
  }

  @Authorized("ADMIN")
  @Query(() => [User])
  async getUsers() {
    const users = await User.find({
      relations: {
        coach: true,
        students: true,
        receivedRequests: true,
        sentRequests: true,
      },
    });
    return users;
  }

  @Query(() => User)
  async getUserById(@Arg("id") id: string) {
    const user = await User.findOne({
      where: {
        id,
      },
      relations: {
        coach: true,
        students: true,
        trainings: true,
        sentRequests: true,
      },
    });
    return user;
  }

  @Mutation(() => String)
  async signUp(
    @Arg("data") userData: UserInput,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.APP_SECRET)
      throw new Error("Missing environment variable");
    if (!userData.firstname || !userData.firstname)
      throw new Error("Veuillez renseigner un nom et un prénom");
    if (!userData.email)
      throw new Error("Veuillez renseigner une adresse mail");
    if (!userData.email) throw new Error();
    const user = await User.findOneBy({ email: userData.email });
    if (user)
      throw new Error("Un utilisateur existe déjà pour cette adresse mail");
    if (!passwordRegex.test(userData.password))
      throw new Error(
        "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
    if (userData.password !== userData.confirmedPassword)
      throw new Error("Les mots de passe doivent être identique");
    const hashPaswword = await argon.hash(userData.password);
    const newUser = new User();
    newUser.firstname = userData.firstname;
    newUser.lastname = userData.lastname;
    newUser.email = userData.email;
    newUser.roles = [];
    newUser.roles.push(userData.roles);
    newUser.password = hashPaswword;
    newUser.sex = userData.sex;
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser.id,
        roles: newUser.roles,
        profile: null,
        tokenVersion: newUser.tokenVersion,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      roles: newUser.roles,
      sex: newUser.sex,
      avatar: newUser.avatar,
    });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") userData: userLogin,
    @Ctx() { res }: { res: Response }
  ) {
    if (!process.env.APP_SECRET)
      throw new Error("Missing environment variable");
    const user = await User.findOne({
      where: { email: userData.email },
      relations: { profile: true },
    });
    if (!user) throw new Error("Adresse e-mail ou mot de passe incorrect.");
    const verify = await argon.verify(user.password, userData.password);
    if (!verify) throw new Error("Adresse e-mail ou mot de passe incorrect.");
    const token = jwt.sign(
      {
        id: user.id,
        roles: user.roles,
        profile: user.profile,
        tokenVersion: user.tokenVersion,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return JSON.stringify({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      roles: user.roles,
      sex: user.sex,
      avatar: user.avatar,
      profile: user.profile,
    });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: { res: Response }) {
    res.clearCookie("token");
    return true;
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Arg("data") data: UpdateProfile,
    @Ctx() context: { user: CtxUser }
  ) {
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) throw new Error("Aucun utilisateur n'est connecté");
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    if (data.avatar) user.avatar = data.avatar;
    if (data.sex) user.sex = data.sex;
    await user.save();
    return user;
  }

  @Authorized()
  @Mutation(() => String)
  async updatePassword(
    @Arg("data") data: UpdatePasswordInput,
    @Ctx() context: { user: CtxUser }
  ) {
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    const verify = await argon.verify(user.password, data.currentPassword);
    if (!verify) throw new Error("Le mot de passe actuel est incorrect");
    if (!passwordRegex.test(data.newPassword))
      throw new Error(
        "Le nouveau mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
    if (data.newPassword !== data.confirmPassword)
      throw new Error("Les mots de passes ne correspondent pas");
    const hashPaswword = await argon.hash(data.newPassword);
    user.password = hashPaswword;
    await user.save();
    return "Le mot de passe a bien été mis à jour";
  }

  @Authorized()
  @Query(() => [ProfileOutput])
  async getProfilePricing(@Ctx() context: { user: CtxUser }) {
    const roles = context.user.roles;
    const profiles = await Profile.find({ where: { type: In(roles) } });
    const result: ProfileOutput[] = await Promise.all(
      profiles.map(async (profile) => {
        let monthlyAmount: number | undefined;
        let yearlyAmount: number | undefined;
        if (profile.stripePriceMonth) {
          const price = await stripe.prices.retrieve(profile.stripePriceMonth);
          monthlyAmount = price.unit_amount! / 100;
        }
        if (profile.stripePriceYear) {
          const price = await stripe.prices.retrieve(profile.stripePriceYear);
          yearlyAmount = price.unit_amount! / 100;
        }
        return {
          id: profile.id,
          name: profile.name,
          monthlyAmount,
          yearlyAmount,
        };
      })
    );
    return result;
  }

  @Authorized()
  @Mutation(() => String)
  async generateSessionProfile(
    @Ctx() context: { user: CtxUser },
    @Arg("id") id: string,
    @Arg("periodicity", () => Periodicity) periodicity: Periodicity
  ) {
    const user = await User.findOne({
      where: { id: context.user.id },
      relations: { profile: true },
    });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    if (user.profile) throw new Error("Vous avez déjà un abonnement en cours");
    const profile = await Profile.findOneBy({ id });
    if (!profile) throw new Error("Aucun profil n'a été trouvé");
    if (!profile.type || !user.roles.includes(profile.type))
      throw new Error("Vous n'êtes pas autorisés à souscrire à cette offre");
    const priceId =
      periodicity === Periodicity.MONTHLY
        ? profile.stripePriceMonth
        : profile.stripePriceYear;
    if (!priceId) throw new Error("Ce plan ne contient pas de priceId.");
    // Vérifie s’il existe déjà une souscription ouverte
    let profileSubscription: ProfileSubscription;
    const existingSub = await ProfileSubscription.findOne({
      where: {
        user: { id: user.id },
        profile: { id: profile.id },
        status: In([
          ProfileSubscriptionStatus.ACTIVE,
          ProfileSubscriptionStatus.SCHEDULE_CANCEL,
          ProfileSubscriptionStatus.INCOMPLETE,
        ]),
      },
      order: { createdAt: "DESC" },
    });
    if (existingSub) {
      if (
        existingSub.status === ProfileSubscriptionStatus.ACTIVE ||
        existingSub.status === ProfileSubscriptionStatus.SCHEDULE_CANCEL
      ) {
        throw new Error("Tu as déjà une souscription active pour ce profil.");
      }
      profileSubscription = existingSub;
      profileSubscription.periodicity = periodicity;
    } else {
      profileSubscription = ProfileSubscription.create({
        user,
        profile,
        periodicity,
        status: ProfileSubscriptionStatus.INCOMPLETE,
      });
      await profileSubscription.save();
    }

    const stripeCustomerId = await checkStripeCustomerId(user);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        profileSubscriptionId: profileSubscription.id,
        periodicity,
      },
      subscription_data: {
        metadata: {
          profileSubscriptionId: profileSubscription.id,
        },
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&refetch=true`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    });

    // ✅ Mets à jour le Stripe Session ID chaque fois
    profileSubscription.stripeSessionId = session.id;
    await profileSubscription.save();
    return session.url;
  }

  @Authorized()
  @Query(() => String)
  async getPortailStrip(@Ctx() context: { user: CtxUser }) {
    const user = await User.findOneBy({ id: context.user.id });
    if (!user) throw new Error("Aucun utilisateur n'a été trouvé");
    if (!user.stripeCustomerId) {
      throw new Error("Aucun compte client n'existe pour le moment");
    }
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/profile?tab=billing&section=subscription`,
    });
    return session.url;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async cancelProfileSubscription(
    @Ctx() context: { user: CtxUser }
  ): Promise<boolean> {
    const userId = context.user.id;
    const subscription = await ProfileSubscription.findOne({
      where: {
        user: { id: userId },
        status: ProfileSubscriptionStatus.ACTIVE,
      },
    });
    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error("Aucune souscription Stripe active trouvée");
    }
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async reactivateProfileSubscription(
    @Ctx() context: { user: CtxUser }
  ): Promise<boolean> {
    const userId = context.user.id;
    const subscription = await ProfileSubscription.findOne({
      where: {
        user: { id: userId },
        status: ProfileSubscriptionStatus.SCHEDULE_CANCEL,
      },
    });
    if (!subscription || !subscription.stripeSubscriptionId) {
      throw new Error(
        "Aucune souscription Stripe en cours d'annulation trouvée"
      );
    }
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });
    return true;
  }
}
