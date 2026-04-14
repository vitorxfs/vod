import { FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/browser";
import { DbMapper } from "./mapper";
import { BaseDbEntity } from "./types";

export class BaseRepository<Model, DbEntity extends BaseDbEntity> {
  protected repo: Repository<DbEntity>;
  protected mapper: DbMapper<Model, DbEntity>;

  constructor(repo: Repository<DbEntity>, mapper: DbMapper<Model, DbEntity>) {
    this.repo = repo;
    this.mapper = mapper;
  }

  async create(data: Model): Promise<Model> {
    const entity = this.repo.create(this.mapper.toPersistence(data));
    const saved = await this.repo.save(entity);
    return this.mapper.toDomain(saved);
  }

  async findAll(): Promise<Model[]> {
    const entities = await this.repo.find();
    return entities.map((entity) => this.mapper.toDomain(entity));
  }

  async findById(id: string): Promise<Model | null> {
    const entity = await this.repo.findOne({ where: { id } as FindOptionsWhere<DbEntity> });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  async update(id: string, data: Partial<Model>): Promise<Model | null> {
    await this.repo.update(
      { id } as FindOptionsWhere<DbEntity>,
      this.mapper.toPersistence(data) as QueryDeepPartialEntity<DbEntity>,
    );
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
