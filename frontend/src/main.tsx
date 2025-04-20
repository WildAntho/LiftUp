import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  from,
} from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import MyStudents from "./pages/MyStudents/MyStudents.tsx";
import { HeroUIProvider } from "@heroui/system";
import MyCoach from "./pages/MyCoach/MyCoach.tsx";
import ProtectedRoute from "./services/ProtectedRoutes.tsx";
import RoleChoice from "./pages/SignUp/RoleChoice.tsx";
import LogoutRoutes from "./services/LogoutRoutes.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import CoachInformation from "./pages/CoachInformation.tsx/CoachInformation.tsx";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import Chat from "./pages/Chat/Chat.tsx";
import MyCrews from "./pages/MyCrews/MyCrews.tsx";
import { onError } from "@apollo/client/link/error";
import { useUserStore } from "./services/zustand/userStore.ts";
import { useCrewStore } from "./services/zustand/crewStore.ts";
import { useStudentStore } from "./services/zustand/studentStore.ts";
import ExerciceModel from "./pages/ExerciceModel/ExerciceModel.tsx";

// Création du lien WebSocket
const wsLink = new GraphQLWsLink(
  createClient({
    url: "/api",
  })
);

// Création du lien HTTP
const httpLink = new HttpLink({
  uri: "/api",
  credentials: "include",
});

// Gestion des erreurs Apollo
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (
        err.extensions?.code === "TOKEN_EXPIRED" ||
        err.extensions?.code === "UNAUTHENTICATED"
      ) {
        // Vide le store Zustand (réinitialise l'état)
        useUserStore.getState().clear();
        useCrewStore.getState().clear();
        useStudentStore.getState().clear();

        // Redirection vers la page de connexion
        window.location.href = "/login";
      }
    }
  }
});

// Utilisation de split pour diriger les requêtes en fonction de leur type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Configuration du client Apollo
const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students",
        element: (
          <ProtectedRoute requiredRole="COACH">
            <MyStudents />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coach",
        element: (
          <ProtectedRoute requiredRole="STUDENT">
            <MyCoach />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coach/:id",
        element: (
          <ProtectedRoute requiredRole="STUDENT">
            <CoachInformation />
          </ProtectedRoute>
        ),
      },
      {
        path: "/crew",
        element: (
          <ProtectedRoute requiredRole="COACH">
            <MyCrews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "/exercices",
        element: (
          <ProtectedRoute>
            <ExerciceModel />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LogoutRoutes>
        <Login />
      </LogoutRoutes>
    ),
  },
  {
    path: "/signup",
    element: (
      <LogoutRoutes>
        <RoleChoice />
      </LogoutRoutes>
    ),
  },
  {
    path: "/signup/:role",
    element: (
      <LogoutRoutes>
        <SignUp />
      </LogoutRoutes>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </HeroUIProvider>
  </StrictMode>
);
