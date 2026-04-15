import { FastifyRequest } from "fastify";
import { IAuthService } from "../../modules/auth/service";
import { UserRole } from "../../modules/user/model";

export enum AccessType {
  Admin = "admin",
  Student = "student",
  Pro = "pro",
}

const rolesByType = {
  [AccessType.Admin]: [UserRole.Admin],
  [AccessType.Student]: [UserRole.Student, UserRole.Admin],
  [AccessType.Pro]: [UserRole.Admin],
};

export const authFactory =
  (authService: IAuthService) => (accessType: AccessType) => async (request: FastifyRequest, reply: any) => {
    const token = request.headers.authorization;
    const parsedToken = token?.startsWith("Bearer ") ? token.split("Bearer ")[1] : token;

    if (!parsedToken) {
      return reply.status(403).send({ error: "Unauthorized" });
    }
    const user = await authService.verifyUserFromToken(parsedToken, "access");
    const isAuthorized = authService.authorize(user, rolesByType[accessType]);
    if (!isAuthorized) {
      return reply.status(403).send({ error: "Unauthorized" });
    }

    request.body = request.body ? { ...request.body, authenticated: user } : { authenticated: user };
  };
