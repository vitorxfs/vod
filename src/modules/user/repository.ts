import { FindOptionsWhere } from "typeorm";
import database from "../../config/database";
import { BaseRepository } from "../../utils/baseRepository";
import { UserDatabaseMapper } from "./database/mapper";
import { UserEntity } from "./database/schema";
import { User } from "./model";

export class UserRepository extends BaseRepository<User, UserEntity> {
  constructor() {
    super(database.getRepository(UserEntity), new UserDatabaseMapper());
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email }, relations: ["progress"] });
    return entity ? this.mapper.toDomain(entity) : null;
  }
}
