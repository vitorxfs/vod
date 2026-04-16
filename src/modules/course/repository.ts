import database from "../../config/database";
import { BaseRepository } from "../../utils/baseRepository";
import { CourseDatabaseMapper } from "./database/mapper";
import { CourseEntity } from "./database/schema";
import { Course } from "./model";

export class CourseRepository extends BaseRepository<Course, CourseEntity> {
  constructor() {
    super(database.getRepository(CourseEntity), new CourseDatabaseMapper());
  }

  async findById(id: string): Promise<Course | null> {
    const courseEntity = await this.repo.findOne({ where: { id }, relations: ["lectures"] });
    return courseEntity ? this.mapper.toDomain(courseEntity) : null;
  }
}
