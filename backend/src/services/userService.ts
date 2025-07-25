import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/user";
import { UserRole } from "../InputType/userType";
import { Profile } from "../entities/profile";
import { GraphQLError } from "graphql";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export function getExpirationTokenTime(token: string): number {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded) {
      throw new Error("Token malformé ou invalide");
    }
    if (typeof decoded.exp === "number") {
      const expTime = decoded.exp * 1000;
      const currentTime = Date.now();
      return (expTime - currentTime) / 1000;
    }
    throw new Error("Aucune date d'expiration trouvée sur le token");
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return 0;
  }
}

export function regenerateToken(
  id: string,
  roles: string,
  profile: Profile,
  tokenVersion: number,
  res: Response
): void {
  try {
    const newToken = jwt.sign(
      { id, roles, profile, tokenVersion },
      process.env.APP_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
    // Supprimer l'ancien cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    // Définir un nouveau cookie avec le nouveau token
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error(error);
  }
}

export function hasAnyRole(user: User | undefined, roles: UserRole[]): boolean {
  if (!user || !user.roles) return false;

  return roles.some((role) => user.roles.includes(role));
}

export async function invalidateUserTokens(user: User) {
  if (!user) {
    throw new Error("Utilisateur non fourni");
  }

  user.tokenVersion += 1;
  await user.save();
}

export const checkTokenVersion = async (
  userId: string,
  jwtTokenVersion: number,
  res: Response
) => {
  const user = await User.createQueryBuilder("user")
    .select(["user.id", "user.tokenVersion"])
    .where("user.id = :id", { id: userId })
    .getOne();

  if (!user) {
    res.clearCookie("token");
    throw new GraphQLError("Utilisateur introuvable", {
      extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
    });
  }

  if (user.tokenVersion !== jwtTokenVersion) {
    res.clearCookie("token");
    throw new GraphQLError("Le token a été invalidé (droits modifiés).", {
      extensions: { code: "TOKEN_INVALIDATED", http: { status: 401 } },
    });
  }
};
