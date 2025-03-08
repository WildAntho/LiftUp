import { In } from "typeorm";
import { Request } from "../entities/request";

export async function checkRequest(senderId: string, receiverId: string) {
  const request = await Request.findOne({
    where: {
      sender: { id: senderId },
      receiver: { id: receiverId },
      status: "PENDING",
    },
  });
  if (request) throw new Error("Une requête a déjà été envoyée");
}
