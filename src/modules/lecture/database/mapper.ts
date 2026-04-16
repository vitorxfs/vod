import { DbMapper } from "../../../utils/mapper";
import { Lecture, LectureProgress } from "../model";
import { LectureEntity, LectureProgressEntity } from "./schema";

export class LectureDatabaseMapper implements DbMapper<Lecture, LectureEntity> {
  toDomain(raw: LectureEntity): Lecture {
    return new Lecture({
      id: raw.id,
      title: raw.title,
      courseId: raw.courseId,
      position: raw.position,
      url: raw.url,
      progress: raw.progress ? raw.progress.map(new LectureProgressDatabaseMapper().toDomain) : [],
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

export class LectureProgressDatabaseMapper implements DbMapper<LectureProgress, LectureProgressEntity> {
  toDomain(raw: LectureProgressEntity): LectureProgress {
    return new LectureProgress({
      id: raw.id,
      lectureId: raw.lectureId,
      userId: raw.userId,
      completed: raw.completed,
      elapsedTime: raw.elapsedTime,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  toPersistence(instance: LectureProgress | Partial<LectureProgress>): Partial<LectureProgressEntity> {
    return {
      id: instance.id,
      lectureId: instance.lectureId,
      userId: instance.userId,
      completed: instance.completed,
      elapsedTime: instance.elapsedTime,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    } as Partial<LectureProgressEntity>;
  }
}
