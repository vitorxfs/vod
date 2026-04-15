import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/routes";
import { courseRoutes } from "./course/routes";
import { userRoutes } from "./user/routes";

export async function routes(app: FastifyInstance) {
  app.register(userRoutes);
  app.register(authRoutes);
  app.register(courseRoutes);
}
