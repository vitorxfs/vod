import { FastifyInstance } from "fastify";
import { errorSchema } from "../../utils/error-handling/errorSchema";
import { AccessType, authFactory } from "../../utils/security/auth";
import { authServiceFactory } from "../auth/factories";
import {
  CreateLectureDto,
  LectureListSchema,
  LectureSchema,
  createLectureSchema,
  idParamSchema,
  updateLectureSchema,
} from "./dto/dto";
import { LectureDtoMapper } from "./dto/mapper";
import { lectureServiceFactory } from "./factories";

const lectureService = lectureServiceFactory();
const auth = authFactory(authServiceFactory());

export async function lectureRoutes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/lectures",
    schema: {
      body: createLectureSchema,
      response: {
        201: LectureSchema,
        400: errorSchema,
      },
    },
    preValidation: auth(AccessType.Admin),
    handler: async (request, reply) => {
      const data = request.body as CreateLectureDto;
      const lecture = await lectureService.create(LectureDtoMapper.toCreateModel(data));
      const lectureDto = LectureDtoMapper.toDto(lecture);

      return reply.status(201).send(lectureDto);
    },
  });

  app.route({
    method: "GET",
    url: "/lectures",
    schema: {
      response: {
        200: LectureListSchema,
      },
    },
    preValidation: auth(AccessType.Student),
    handler: async (request, reply) => {
      const lectures = await lectureService.findAll();
      const lectureDtos = lectures.map((lecture) => LectureDtoMapper.toDto(lecture));

      return reply.send(lectureDtos);
    },
  });

  app.route({
    method: "GET",
    url: "/lectures/:id",
    schema: {
      params: idParamSchema,
      response: {
        200: LectureSchema,
        404: errorSchema,
      },
    },
    preValidation: auth(AccessType.Student),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const lecture = await lectureService.findById(id);

      if (!lecture) {
        return reply.status(404).send({ error: "Not found" });
      }

      const lectureDto = LectureDtoMapper.toDto(lecture);
      return reply.send(lectureDto);
    },
  });

  app.route({
    method: "PATCH",
    url: "/lectures/:id",
    schema: {
      params: idParamSchema,
      body: updateLectureSchema,
      response: {
        200: LectureSchema,
        404: errorSchema,
      },
    },
    preValidation: auth(AccessType.Admin),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const data = request.body as Partial<CreateLectureDto>;

      const lecture = await lectureService.update(id, {});

      if (!lecture) {
        return reply.status(404).send({ error: "Not found" });
      }

      const lectureDto = LectureDtoMapper.toDto(lecture);
      return reply.send(lectureDto);
    },
  });

  app.route({
    method: "DELETE",
    url: "/lectures/:id",
    schema: {
      params: idParamSchema,
      response: {
        204: { type: "null" },
        404: errorSchema,
      },
    },
    preValidation: auth(AccessType.Admin),
    handler: async (request, reply) => {
      const { id } = request.params as { id: string };
      const deleted = await lectureService.delete(id);

      if (!deleted) {
        return reply.status(404).send({ error: "Not found" });
      }

      return reply.status(204).send(null);
    },
  });
}
