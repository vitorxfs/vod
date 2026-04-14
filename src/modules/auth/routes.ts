import { FastifyInstance, FastifyReply } from "fastify";
import { errorSchema } from "../../utils/error-handling/errorSchema";
import { userSchema } from "../user/dto/dto";
import { UserDTOMapper } from "../user/dto/mapper";
import { LoginDto, loginSchema } from "./dto/dto";
import { authServiceFactory } from "./factories";

const authService = authServiceFactory();

export async function authRoutes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/auth/login",
    schema: {
      body: loginSchema,
      response: {
        201: userSchema,
        400: errorSchema,
      },
    },
    handler: async (request, reply: FastifyReply) => {
      const data = request.body as LoginDto;
      const user = await authService.login(data);

      if (!user) {
        return reply.status(400).send({ error: "Invalid email or password" });
      }

      const authDto = UserDTOMapper.toDto(user);

      return reply.setCookie("token", authService.generateToken(user)).status(200).send(authDto);
    },
  });
}
