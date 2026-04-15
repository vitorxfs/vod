import { DbMapper } from "../../../utils/mapper";
import { Course } from "../model";
import { CourseEntity } from "./schema";

export class CourseDatabaseMapper implements DbMapper<Course, CourseEntity> {
  toDomain(raw: CourseEntity): Course {
    return new Course({
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  toPersistence(instance: Course | Partial<Course>): Partial<CourseEntity> {
    return {
      id: instance.id,
      name: instance.name,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    } as Partial<CourseEntity>;
  }
}
