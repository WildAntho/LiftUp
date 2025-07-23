import { createMethodMiddlewareDecorator, PubSub } from "type-graphql";
import { Permission } from "../entities/permission";
import { CtxUser } from "../InputType/coachType";
import { GraphQLError } from "graphql";

interface FullContext {
  req: Request;
  res: Response;
  pubsub: PubSub;
  user: CtxUser;
}

export function HasPermissionMethod(
  permissions: string[],
  mode: "AND" | "OR" = "AND"
) {
  return createMethodMiddlewareDecorator<FullContext>(
    async ({ context }, next) => {
      const user = context.user;

      if (!user) {
        throw new GraphQLError("Utilisateur non authentifié.", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      if (user.roles.includes("ADMIN")) {
        return next();
      }

      const userPermissionKeys =
        user.profile?.permissions?.map((p: Permission) => p.key) || [];

      const hasPermission =
        mode === "AND"
          ? permissions.every((perm) => userPermissionKeys.includes(perm))
          : permissions.some((perm) => userPermissionKeys.includes(perm));

      if (!hasPermission) {
        throw new GraphQLError("Permissions insuffisantes", {
          extensions: {
            code: "FORBIDDEN",
            http: { status: 403 },
          },
        });
      }

      return next();
    }
  );
}
