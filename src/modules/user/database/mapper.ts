import { DeepPartial } from "typeorm";
import { DbMapper } from "../../../utils/mapper";
import { User } from "../model";
import { UserEntity } from "./schema";

export class UserDatabaseMapper implements DbMapper<User, UserEntity> {
  toDomain(raw: UserEntity): User {
    return new User({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  toPersistence(user: Partial<User>): DeepPartial<UserEntity> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as DeepPartial<UserEntity>;
  }
}
