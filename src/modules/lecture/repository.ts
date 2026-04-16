import database from "../../config/database";
import { BaseRepository } from "../../utils/baseRepository";
import { LectureDatabaseMapper, LectureProgressDatabaseMapper } from "./database/mapper";
import { LectureEntity, LectureProgressEntity } from "./database/schema";
import { Lecture, LectureProgress } from "./model";

export class LectureRepository extends BaseRepository<Lecture, LectureEntity> {
  constructor() {
    super(database.getRepository(LectureEntity), new LectureDatabaseMapper());
  }

  async findById(id: string): Promise<Lecture | null> {
    const lectureEntity = await this.repo.findOne({ where: { id }, relations: ["progress"] });
    return lectureEntity ? this.mapper.toDomain(lectureEntity) : null;
  }

  async findAll(): Promise<Lecture[]> {
    const lectureEntities = await this.repo.find({ relations: ["progress"] });
    return lectureEntities.map((entity) => this.mapper.toDomain(entity));
  }

  async updateProgress(userId: string, lectureId: string, progress: Partial<LectureProgress>): Promise<LectureProgress | null> {
    let progressEntity = await database.getRepository<LectureProgress>(LectureProgressEntity).findOne({ where: { userId, lectureId } });

    if (!progressEntity) {
      progressEntity = database.getRepository(LectureProgressEntity).create();
    } else {
      progressEntity = new LectureProgressDatabaseMapper().toDomain(progressEntity);
    }

    const updatedLectureProgress = await database.getRepository(LectureProgressEntity).save(progressEntity);
    return new LectureProgressDatabaseMapper().toDomain(updatedLectureProgress);
  }
}
