import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { verify } from "../../utils/security/hash";
import { User, UserRole } from "../user/model";
import { UserRepository } from "./../user/repository";
import { LoginDto } from "./dto/dto";
import { IUserService } from '../user/service';

export interface IAuthService {
  login({ email, password }: LoginDto): Promise<User | null>;
  generateToken(user: User, tokenType: "access" | "mfa"): string;
  authorize(user: User | null, roles: UserRole[]): boolean;
  verifyUserFromToken(token: string, tokenType: string): Promise<User | null>;
}

export interface AuthServiceDependencies {
  userService: IUserService;
}

export class AuthService implements IAuthService {
  private userService: IUserService;

  constructor(deps: AuthServiceDependencies) {
    this.userService = deps.userService;
  }

  async login({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    if (!(await this.verifyPassword(password, user.password))) {
      return null;
    }

    return user;
  }

  generateToken(user: User, tokenType: "access" | "mfa"): string {
    return jwt.sign({ id: user.id, tokenType }, env.JWT_SECRET, { expiresIn: tokenType === "access" ? "8h" : "10m" });
  }

  authorize(user: User | null, roles: UserRole[]): boolean {
    if (!user) {
      return false;
    }
    return roles.includes(user.role);
  }

  async verifyUserFromToken(token: string, tokenType: string): Promise<User | null> {
    const userId = this.decodeToken(token, tokenType);
    if (!userId) {
      return Promise.resolve(null);
    }
    return this.userService.findById(userId);
  }

  private decodeToken(token: string, tokenType: string): string | null {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; tokenType: string };
      if (decoded.tokenType === tokenType) {
        return decoded.id;
      }
      return null;
    } catch {
      return null;
    }
  }

  private async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    try {
      return await verify(inputPassword, storedPassword);
    } catch {
      return false;
    }
  }
}
