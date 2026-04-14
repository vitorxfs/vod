import { User } from "../model";
import { CreateUserDTO, UserDTO } from "./dto";

export class UserDTOMapper {
  static toDto(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toModel(dto: UserDTO): User {
    return new User({
      id: dto.id,
      name: dto.name,
      email: dto.email,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  static toCreateModel(dto: CreateUserDTO): User {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }
}
