import { Course } from "../model";
import { CourseDto, CreateCourseDto } from "./dto";

export class CourseDtoMapper {
  static toDto(instance: Course): CourseDto {
    return {
      id: instance.id,
      name: instance.name,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };
  }

  static toModel(dto: CourseDto): Course {
    return new Course({
      id: dto.id,
      name: dto.name,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  static toCreateModel(dto: CreateCourseDto): Course {
    return new Course({
      name: dto.name,
    });
  }
}
