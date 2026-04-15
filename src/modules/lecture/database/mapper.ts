import { DbMapper } from "../../../utils/mapper";
import { Lecture } from "../model";
import { LectureEntity } from "./schema";

export class LectureDatabaseMapper implements DbMapper<Lecture, LectureEntity> {
  toDomain(raw: LectureEntity): Lecture {
    return new Lecture({
      id: raw.id,
      title: raw.title,
      courseId: raw.courseId,
      position: raw.position,
      url: raw.url,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  toPersistence(instance: Lecture | Partial<Lecture>): Partial<LectureEntity> {
    return {
      id: instance.id,
      title: instance.title,
      courseId: instance.courseId,
      position: instance.position,
      url: instance.url,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    } as Partial<LectureEntity>;
  }
}
