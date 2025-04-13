import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import jwt, { JwtPayload } from "jsonwebtoken";
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
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createPubSub } from "@graphql-yoga/subscription";
import { Response, Request } from "express";
import { NotificationResolver } from "./resolvers/notificationResolver";
import { SubscriptionResolver } from "./resolvers/subscriptionResolver";
import { CrewResolver } from "./resolvers/crewResolver";
import { GraphQLError } from "graphql";
import {
  regenerateToken,
  getExpirationTokenTime,
} from "./services/userService";
import { MessageResolver } from "./resolvers/messageResolver";
import { ConversationResolver } from "./resolvers/conversationResolver";
import { MessageSusbscription } from "./resolvers/messageSubscriptionResolver";
import { MembershipResolver } from "./resolvers/memberShipResolver";

const pubsub = createPubSub();

async function StartGraphQLServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
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
      MembershipResolver
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

  const app = express();
  const httpServer = createServer(app);
  const options = {
    context: async ({ res, req }: { res: Response; req: Request }) => {
      if (!process.env.APP_SECRET)
        throw new Error("Missing environment variable");
      try {
        const token =
          req.headers.cookie && req.headers.cookie.split("token=")[1];
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
    },
  };

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });
  const serverCleanup = useServer(
    {
      schema,
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, options)
  );

  // Démarrer le serveur HTTP
  httpServer.listen(4100, () => {
    console.log(`🚀 Server ready at http://localhost:4100/`);
    console.log(
      `🚀 WebSocket server ready at ws://localhost:4100/subscriptions`
    );
  });

  // const server = new ApolloServer({ schema });
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4100 },
  //   context: async ({ req, res }) => {
  //     if (!process.env.APP_SECRET)
  //       throw new Error("Missing environment variable");
  //     const token = req.headers.cookie && req.headers.cookie.split("token=")[1];
  //     if (!token) return { res };
  //     const tokenContent = jwt.verify(token, process.env.APP_SECRET);
  //     return {
  //       res,
  //       user: tokenContent,
  //     };
  //   },
  // });

  // console.log(`🚀  Server ready at: ${url}`);
}

StartGraphQLServer();
