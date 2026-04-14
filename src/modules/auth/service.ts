import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { verify } from "../../utils/security/hash";
import { User } from "../user/model";
import { UserRepository } from "./../user/repository";
import { LoginDto } from "./dto/dto";

export interface IAuthService {
  login({ email, password }: LoginDto): Promise<User | null>;
  generateToken(user: User): string;
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

  generateToken(user: User): string {
    return jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "8h" });
  }

  private async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    try {
      return await verify(inputPassword, storedPassword);
    } catch {
      return false;
    }
  }
}
