import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { CoachResolver } from "./resolvers/coachResolver";
import { TrainingResolver } from "./resolvers/trainingResolver";
import { FeedbackResolver } from "./resolvers/feedbackResolver";
import { RequestResolver } from "./resolvers/requestResolver";
import { StudentResolver } from "./resolvers/studentResolver";
import { ExerciceResolver } from "./resolvers/exerciceResolver";
import { ExerciceTypeResolver } from "./resolvers/exerciceTypeResolver";
import { ExerciceModelResolver } from "./resolvers/exerciceModelResolver";
import { CoachProfileResolver } from "./resolvers/coachProfileResolver";
import { OfferCategoryResolver } from "./resolvers/offerCategoryResolver";
import { OfferResolver } from "./resolvers/offerResolver";
import { NotificationResolver } from "./resolvers/notificationResolver";
import { SubscriptionResolver } from "./resolvers/subscriptionResolver";
import { CrewResolver } from "./resolvers/crewResolver";
import { MessageResolver } from "./resolvers/messageResolver";
import { ConversationResolver } from "./resolvers/conversationResolver";
import { MessageSusbscription } from "./resolvers/messageSubscriptionResolver";
import { MembershipResolver } from "./resolvers/memberShipResolver";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GraphQLError } from "graphql";
import {
  regenerateToken,
  getExpirationTokenTime,
} from "./services/userService";
import { Response, Request } from "express";
import { createPubSub } from "@graphql-yoga/subscription";
import { ProgramResolver } from "./resolvers/programResolver";

type PubSubType = ReturnType<typeof createPubSub>;

export const createSchema = async (pubsub: PubSubType) => {
  return buildSchema({
    resolvers: [
      UserResolver,
      CoachResolver,
      TrainingResolver,
      FeedbackResolver,
      RequestResolver,
      StudentResolver,
      ExerciceResolver,
      ExerciceTypeResolver,
      ExerciceModelResolver,
      CoachProfileResolver,
      OfferCategoryResolver,
      OfferResolver,
      NotificationResolver,
      SubscriptionResolver,
      CrewResolver,
      MessageResolver,
      ConversationResolver,
      MessageSusbscription,
      MembershipResolver,
      ProgramResolver,
    ],
    emitSchemaFile: true,
    pubSub: pubsub,
    authChecker: ({ context }, neededRoles) => {
      if (!context.user) return false;
      if (neededRoles.length > 0) {
        return neededRoles.includes(context.user.roles);
      } else {
        if (context.user) return true;
      }
      return false;
    },
  });
};

export const createContext = async (
  { res, req }: { res: Response; req: Request },
  pubsub: PubSubType
) => {
  if (!process.env.APP_SECRET) throw new Error("Missing environment variable");
  try {
    const token = req.headers.cookie && req.headers.cookie.split("token=")[1];
    if (!token) return { req, res };
    const tokenContent = jwt.verify(
      token,
      process.env.APP_SECRET
    ) as JwtPayload;
    const timeRemaining = getExpirationTokenTime(token);
    if (timeRemaining < 7200)
      regenerateToken(tokenContent.id, tokenContent.role, res);
    return {
      req,
      res,
      pubsub,
      user: tokenContent,
    };
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      throw new GraphQLError("Le token d'authentification a expiré.", {
        extensions: {
          code: "TOKEN_EXPIRED",
          http: { status: 401 },
        },
      });
    } else if (err.name === "JsonWebTokenError") {
      res.clearCookie("token");
      throw new GraphQLError("Invalid token. Authentication failed.", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    } else {
      throw new Error("Authentication error: " + err.message);
    }
  }
};
