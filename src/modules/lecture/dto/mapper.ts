import { Lecture } from "../model";
import { CreateLectureDto, LectureDto } from "./dto";

export class LectureDtoMapper {
  static toDto(instance: Lecture): LectureDto {
    return {
      id: instance.id,
      title: instance.title,
      courseId: instance.courseId,
      position: instance.position,
      url: instance.url,
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
