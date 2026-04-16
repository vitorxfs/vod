import { Lecture, LectureProgress } from "../model";
import { CreateLectureDto, LectureDto, LectureProgressDto } from "./dto";

export class LectureDtoMapper {
  static toDto(instance: Lecture): LectureDto {
    return {
      id: instance.id,
      title: instance.title,
      courseId: instance.courseId,
      position: instance.position,
      url: instance.url,
      progress: instance.progress[0] ? LectureProgressDtoMapper.toDto(instance.progress[0]) : null,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };
  }

  static toModel(dto: LectureDto): Lecture {
    return new Lecture({
      id: dto.id,
      title: dto.title,
      courseId: dto.courseId,
      position: dto.position,
      url: dto.url,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  static toCreateModel(dto: CreateLectureDto): Lecture {
    return new Lecture({
      title: dto.title,
      courseId: dto.courseId,
      position: dto.position,
      url: dto.url,
    });
  }
}

export class LectureProgressDtoMapper {
  static toDto(instance: LectureProgress): LectureProgressDto {
    return {
      id: instance.id,
      lectureId: instance.lectureId,
      completed: instance.completed,
      elapsedTime: instance.elapsedTime,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };
  }
}
