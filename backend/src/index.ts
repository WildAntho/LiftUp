import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { dataSource } from "./config/db";
import { createSchema, createContext } from "./schema";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createPubSub } from "@graphql-yoga/subscription";

const pubsub = createPubSub();

async function StartGraphQLServer() {
  await dataSource.initialize();
  const schema = await createSchema(pubsub);

  const app = express();
  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer(
    {
      schema,
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    introspection: process.env.NODE_ENV !== "production",
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
    cors<cors.CorsRequest>({
      origin: process.env.FRONTEND_HOST,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ res, req }) => createContext({ res, req }, pubsub),
    })
  );

  // Démarrer le serveur HTTP
  httpServer.listen(4100, () => {
    console.log(`🚀 Server ready at http://localhost:4100/`);
    console.log(`🚀 WebSocket server ready at ws://localhost:4100/`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `Apollo Playground: ${
        process.env.NODE_ENV !== "production" ? "enabled" : "disabled"
      }`
    );
  });
}

StartGraphQLServer();
