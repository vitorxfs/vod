import { DeepPartial } from "typeorm";
import { BaseDbEntity } from "./types";

export interface DbMapper<Model, DbEntity extends BaseDbEntity> {
  toDomain(raw: DbEntity): Model;
  toPersistence(domain: Partial<Model>): DeepPartial<DbEntity>;
}
