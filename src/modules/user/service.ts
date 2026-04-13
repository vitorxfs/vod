import { CreateUserDTO } from "./dto/dto";
import { User } from "./model";
import { UserRepository } from "./repository";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const now = new Date();

    const user = new User({
      id: undefined as any,
      name: createUserDTO.name,
      email: createUserDTO.email,
      password: createUserDTO.password,
      createdAt: now,
      updatedAt: now,
    });

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

  async update(id: string, data: Partial<CreateUserDTO>): Promise<User | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
