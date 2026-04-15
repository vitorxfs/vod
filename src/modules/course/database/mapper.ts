import { DbMapper } from "../../../utils/mapper";
import { LectureDatabaseMapper } from "../../lecture/database/mapper";
import { Course } from "../model";
import { CourseEntity } from "./schema";

export class CourseDatabaseMapper implements DbMapper<Course, CourseEntity> {
  lectureMapper: LectureDatabaseMapper;

  constructor() {
    this.lectureMapper = new LectureDatabaseMapper();
  }

  toDomain(raw: CourseEntity): Course {
    return new Course({
      id: raw.id,
      name: raw.name,
      lectures: raw.lectures.map(this.lectureMapper.toDomain),
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
