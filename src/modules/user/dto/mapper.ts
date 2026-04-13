import { User } from "../model";
import { UserDTO } from "./dto";

export function dtoMapper(user: User): UserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
