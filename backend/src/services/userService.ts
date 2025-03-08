import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  res: Response
): void {
  try {
    const newToken = jwt.sign({ id, roles }, process.env.APP_SECRET as string, {
      expiresIn: "7d",
    });
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
