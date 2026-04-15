import database from "../../config/database";
import { BaseRepository } from "../../utils/baseRepository";
import { LectureDatabaseMapper } from "./database/mapper";
import { LectureEntity } from "./database/schema";
import { Lecture } from "./model";

export class LectureRepository extends BaseRepository<Lecture, LectureEntity> {
  constructor() {
    super(database.getRepository(LectureEntity), new LectureDatabaseMapper());
  }
}
