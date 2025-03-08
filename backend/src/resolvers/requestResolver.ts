import { Arg, Ctx, Mutation, PubSub, Query, Resolver } from "type-graphql";
import { Request } from "../entities/request";
import { AddRequestData } from "../InputType/requestType";
import { User } from "../entities/user";
import { createNotification } from "../services/notificationsService";
import { NotificationType } from "../type";
import { checkRequest } from "../services/requestService";
import { Offer } from "../entities/offer";
import { Crew } from "../entities/crew";

@Resolver(Request)
export class RequestResolver {
  @Query(() => [Request])
  async getRequest(@Arg("id") id: string) {
    const requests = await Request.find({
      where: {
        status: "PENDING",
        receiver: {
          id: id,
        },
      },
      relations: {
        offer: true,
      },
    });
    return requests;
  }

  @Query(() => [Request])
  async getSent(@Arg("id") id: string) {
    const sent = await Request.find({
      where: {
        status: "PENDING",
        sender: {
          id: id,
        },
      },
    });
    return sent;
  }

  @Mutation(() => String)
  async addRequest(
    @Arg("data")
    { receiverId, senderId, description, phone, offerId }: AddRequestData,
    @Ctx() context: { pubsub: PubSub; user: User }
  ) {
    await checkRequest(senderId, receiverId);
    const newRequest = new Request();
    const offer = await Offer.findOneBy({ id: offerId });
    if (description) newRequest.description = description;
    if (phone) newRequest.phone = phone;
    if (offer) newRequest.offer = offer;
    const receiver = await User.findOneBy({ id: receiverId });
    const sender = await User.findOneBy({ id: senderId });
    if (receiver?.roles === "COACH" && sender?.roles === "COACH")
      throw new Error("Un coach ne peut pas ajouter un coach");
    if (receiver && sender) {
      newRequest.receiver = receiver;
      newRequest.sender = sender;
      await newRequest.save();

      const newNotification = await createNotification(
        newRequest.id,
        NotificationType.NEW_REQUEST,
        receiverId
      );

      context.pubsub.publish("REQUEST_ADDED", {
        newNotification,
        topic: "REQUEST_ADDED",
      });
      return JSON.stringify("La demande a été envoyée");
    }
  }

  @Mutation(() => String)
  async acceptRequest(
    @Arg("data") { receiverId, senderId }: AddRequestData,
    @Arg("id") id: string,
    @Ctx() context: { pubsub: PubSub; user: User }
  ) {
    // Récupération des users affiliés à la request
    const receiver = await User.findOne({
      where: {
        id: receiverId,
      },
      relations: {
        coach: true,
        students: true,
      },
    });
    const sender = await User.findOne({
      where: {
        id: senderId,
      },
      relations: {
        coach: true,
        students: true,
        studentOffer: true,
      },
    });
    // Récupération de la request
    const request = await Request.findOne({
      where: {
        id,
      },
      relations: {
        offer: true,
      },
    });
    // Assignation de l'offre au user si c'est un élève
    if (sender?.roles === "STUDENT" && request?.offer) {
      sender.studentOffer = request?.offer;
      await sender.save();
    }
    // Récupération du Crew lié à l'offre souscris par le user (si il y en a)
    if (request && request.offer) {
      const crew = await Crew.findOne({
        where: {
          offer: {
            id: request.offer.id,
          },
        },
        relations: {
          offer: true,
          students: true,
        },
      });
      if (crew && sender?.roles === "STUDENT") {
        crew.students.push(sender);
        await crew.save();
      }
    }
    // Déclaration de la variable qui sera enregistré dans la table Notification
    let requestNotification;
    // Gestion des demandes en cours en fonction du rôle du receiver / sender
    if (receiver && sender) {
      if (receiver.roles === "COACH") {
        receiver.students = receiver.students
          ? [...receiver.students, sender]
          : [sender];
        await receiver.save();
        if (request) {
          request.status = "ACCEPTED";
          request.save();
          requestNotification = request;
        }
      }
      if (receiver.roles === "STUDENT") {
        receiver.coach = sender;
        await receiver.save();
        if (request) {
          request.status = "ACCEPTED";
          await request.save();
          requestNotification = request;
        }
        const requests = await Request.find({
          where: [
            { status: "PENDING", sender: { id: receiverId } },
            { status: "PENDING", receiver: { id: receiverId } },
          ],
          relations: {
            sender: true,
            receiver: true,
          },
        });
        if (requests.length > 0) {
          for (const request of requests) {
            request.status = "REJECTED";
            await request.save();
          }
        }
      }
    }
    // Création d'une notification
    if (requestNotification) {
      const newNotification = await createNotification(
        requestNotification.id,
        NotificationType.ACCEPT_REQUEST,
        senderId
      );
      context.pubsub.publish("REQUEST_ACCEPTED", {
        newNotification,
        topic: "REQUEST_ACCEPTED",
      });
    }
    return JSON.stringify("L'ajout a bien été effectué");
  }

  @Mutation(() => String)
  async rejectRequest(@Arg("id") id: string) {
    const request = await Request.findOneBy({ id });
    if (!request) throw new Error("Aucune requête n'existe sur cet ID");
    request.status = "REJECTED";
    await request.save();
    return JSON.stringify("La demande dajout a bien été refusée");
  }

  @Query(() => [Request])
  async getUnreadRequests(@Ctx() context: { user: User }) {
    const requests = await Request.find({
      where: {
        receiver: { id: context.user.id },
        status: "PENDING",
      },
      order: { createdAt: "DESC" },
      take: 10,
    });
    return requests;
  }
}
