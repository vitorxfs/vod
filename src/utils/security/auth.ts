import { DoneFuncWithErrOrRes, FastifyRequest } from 'fastify';
import { IAuthService } from '../../modules/auth/service';
import { UserRole } from '../../modules/user/model';

export const authFactory = (authService: IAuthService) => (roles: UserRole[]) => async (request: FastifyRequest, reply: any) => {
  const token = request.headers.authorization;
  const parsedToken = token?.startsWith("Bearer ") ? token.split('Bearer ')[1] : token;

  if (!parsedToken) {
    return reply.status(403).send({ error: "Unauthorized" });
  }
  const user = await authService.verifyUserFromToken(parsedToken, "access");
  const isAuthorized = authService.authorize(user, roles);
  if (!isAuthorized) {
    return reply.status(403).send({ error: "Unauthorized" });
  }

  request.body = request.body ? { ...request.body, authenticated: user } : { authenticated: user };
}
