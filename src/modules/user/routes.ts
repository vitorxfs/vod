import { FastifyInstance, FastifyRequest } from "fastify";
import { errorSchema } from "../../utils/error-handling/errorSchema";
import {
  CreateUserDTO,
  createUserSchema,
  idParamSchema,
  updateUserSchema,
  userListSchema,
  userSchema,
} from "./dto/dto";
import { UserDTOMapper } from "./dto/mapper";
import { userServiceFactory } from "./factories";
import { authServiceFactory } from '../auth/factories';
import { User, UserRole } from './model';
import { authFactory } from '../../utils/security/auth';
import { ErrorCodes } from '../../utils/error-handling/errorCodes';

const userService = userServiceFactory();
const auth = authFactory(authServiceFactory());

export async function userRoutes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/users/new-account",
    schema: {
      body: createUserSchema,
      response: {
        201: userSchema,
        400: errorSchema,
        409: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const data = request.body as CreateUserDTO;

      const existingUser = await userService.findByEmail(data.email);
      if (existingUser) {
        return reply.status(409).send({ error: ErrorCodes.Conflict, message: "Email already in use" });
      }

      const user = await userService.create(UserDTOMapper.toCreateModel(data));
      const userDTO = UserDTOMapper.toDto(user);

      return reply.status(201).send(userDTO);
    },
  });

  app.route({
    method: "GET",
    url: "/users",
    schema: {
      response: {
        200: userListSchema,
      },
    },
    preValidation: auth([UserRole.Admin]),
    handler: async (request, reply) => {
      const users = await userService.findAll();
      const usersDTO = users.map((user) => UserDTOMapper.toDto(user));
      return reply.send(usersDTO);
    },
  });

  app.route({
    method: "GET",
    url: "/users/:id",
    schema: {
      params: idParamSchema,
      response: {
        200: userSchema,
        404: errorSchema
      },
    },
    preValidation: auth([UserRole.Student, UserRole.Admin]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const { authenticated } = request.body as { authenticated: User };

      if (authenticated.id !== id && authenticated.role !== UserRole.Admin) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      const user = await userService.findById(id);

      if (!user) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      const userDTO = UserDTOMapper.toDto(user);
      return reply.send(userDTO);
    },
  });

  app.route({
    method: "PATCH",
    url: "/users/:id",
    schema: {
      params: idParamSchema,
      body: updateUserSchema,
      response: {
        200: userSchema,
        404: errorSchema,
      },
    },
    preValidation: auth([UserRole.Student, UserRole.Admin]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const { authenticated } = request.body as { authenticated: User };

      if (authenticated.id !== id && authenticated.role !== UserRole.Admin) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      const updateData = request.body as Partial<CreateUserDTO>;

      const user = await userService.update(id, updateData);
      if (!user) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      const userDTO = UserDTOMapper.toDto(user);
      return reply.send(userDTO);
    },
  });

  app.route({
    method: "DELETE",
    url: "/users/:id",
    schema: {
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
      },
    },
    preValidation: auth([UserRole.Student, UserRole.Admin]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const { authenticated } = request.body as { authenticated: User };

      if (authenticated.id !== id && authenticated.role !== UserRole.Admin) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      const deleted = await userService.delete(id);

      if (!deleted) {
        return reply.status(404).send({ error: ErrorCodes.NotFound, message: "User not found" });
      }

      return reply.status(204).send();
    },
  });
}
