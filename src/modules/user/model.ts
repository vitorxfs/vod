export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  password: string;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
