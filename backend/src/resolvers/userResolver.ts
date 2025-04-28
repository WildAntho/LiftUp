import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { UpdateProfile, UserInput, userLogin } from "../InputType/userType";
import { CtxUser } from "../InputType/coachType";
import { passwordRegex } from "../services/userService";

@Resolver(User)
export class UserResolver {
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
    newUser.roles = userData.roles;
    newUser.password = hashPaswword;
    await newUser.save();
    const token = jwt.sign(
      { id: newUser.id, roles: newUser.roles },
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
    const user = await User.findOneBy({ email: userData.email });
    if (!user) throw new Error("Adresse e-mail ou mot de passe incorrect.");
    const verify = await argon.verify(user.password, userData.password);
    if (!verify) throw new Error("Adresse e-mail ou mot de passe incorrect.");
    const token = jwt.sign(
      { id: user.id, roles: user.roles },
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
      avatar: user.avatar,
    });
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: { res: Response }) {
    res.clearCookie("token");
    return true;
  }

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
    await user.save();
    return user;
  }
}
