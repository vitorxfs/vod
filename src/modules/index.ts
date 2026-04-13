import { FastifyInstance } from "fastify";
import { userRoutes } from "./user/routes";

export async function routes(app: FastifyInstance) {
  await userRoutes(app);
}
