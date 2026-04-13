import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { UserDatabaseMapper } from "./database/mapper";
import { UserEntity } from "./database/schema";
import { User } from "./model";

export class UserRepository {
  private repo: Repository<UserEntity>;

  constructor() {
    this.repo = AppDataSource.getRepository(UserEntity);
  }

  async create(user: User): Promise<User> {
    const entity = this.repo.create(UserDatabaseMapper.toPersistence(user));
    const saved = await this.repo.save(entity);
    return UserDatabaseMapper.toDomain(saved);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => UserDatabaseMapper.toDomain(entity));
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? UserDatabaseMapper.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    return entity ? UserDatabaseMapper.toDomain(entity) : null;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
