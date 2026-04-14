import { User } from "../model";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "./dto";

export class UserDTOMapper {
  static toDto(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };
  }

  static toUpdateModel(id: string, dto: UpdateUserDTO): User {
    return new User({
      id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
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
