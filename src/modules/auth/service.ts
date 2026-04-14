import { verify } from "../../utils/security/hash";
import { User } from "../user/model";
import { UserRepository } from "./../user/repository";
import { LoginDto } from "./dto/dto";

export interface IAuthService {
  login({ email, password }: LoginDto): Promise<User | null>;
}

export interface AuthServiceDependencies {
  repository: UserRepository;
}

export class AuthService implements IAuthService {
  private repository: UserRepository;

  constructor(deps: AuthServiceDependencies) {
    this.repository = deps.repository;
  }

  async login({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      return null;
    }

    if (!(await this.verifyPassword(password, user.password))) {
      return null;
    }

    return user;
  }

  private async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    try {
      return await verify(inputPassword, storedPassword);
    } catch {
      return false;
    }
  }
}
