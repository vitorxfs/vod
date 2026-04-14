import { User } from "./model";
import { UserRepository } from "./repository";

export interface IUserService {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

export interface UserServiceDependencies {
  repository: UserRepository;
}

export class UserService implements IUserService {
  private repository: UserRepository;

  constructor(deps: UserServiceDependencies) {
    this.repository = deps.repository;
  }

  async create(user: User): Promise<User> {
    return this.repository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
