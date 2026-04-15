import { FastifyInstance } from "fastify";
import { errorSchema } from "../../utils/error-handling/errorSchema";
import { authFactory } from "../../utils/security/auth";
import { authServiceFactory } from "../auth/factories";
import { UserRole } from "../user/model";
import {
  CourseListSchema,
  CourseSchema,
  CreateCourseDto,
  createCourseSchema,
  idParamSchema,
  updateCourseSchema,
} from "./dto/dto";
import { CourseDtoMapper } from "./dto/mapper";
import { courseServiceFactory } from "./factories";

const courseService = courseServiceFactory();
const auth = authFactory(authServiceFactory());

export async function courseRoutes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/courses",
    schema: {
      body: createCourseSchema,
      response: {
        201: CourseSchema,
        400: errorSchema,
      },
    },
    preValidation: auth([UserRole.Admin]),
    handler: async (request, reply) => {
      const data = request.body as CreateCourseDto;
      const course = await courseService.create(CourseDtoMapper.toCreateModel(data));
      const courseDto = CourseDtoMapper.toDto(course);

      return reply.status(201).send(courseDto);
    },
  });

  app.route({
    method: "GET",
    url: "/courses",
    schema: {
      response: {
        200: CourseListSchema,
      },
    },
    handler: async (request, reply) => {
      const courses = await courseService.findAll();
      const courseDtos = courses.map((course) => CourseDtoMapper.toDto(course));

      return reply.send(courseDtos);
    },
  });

  app.route({
    method: "GET",
    url: "/courses/:id",
    schema: {
      params: idParamSchema,
      response: {
        200: CourseSchema,
        404: errorSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const course = await courseService.findById(id);

      if (!course) {
        return reply.status(404).send({ error: "Not found" });
      }

      const courseDto = CourseDtoMapper.toDto(course);
      return reply.send(courseDto);
    },
  });

  app.route({
    method: "PATCH",
    url: "/courses/:id",
    schema: {
      params: idParamSchema,
      body: updateCourseSchema,
      response: {
        200: CourseSchema,
        404: errorSchema,
      },
    },
    preValidation: auth([UserRole.Admin]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const data = request.body as Partial<CreateCourseDto>;

      const course = await courseService.update(id, {});

      if (!course) {
        return reply.status(404).send({ error: "Not found" });
      }

      const courseDto = CourseDtoMapper.toDto(course);
      return reply.send(courseDto);
    },
  });

  app.route({
    method: "DELETE",
    url: "/courses/:id",
    schema: {
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
      },
    },
    preValidation: auth([UserRole.Admin]),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const deleted = await courseService.delete(id);

      if (!deleted) {
        return reply.status(404).send({ error: "Not found" });
      }

      return reply.status(204).send(null);
    },
  });
}
