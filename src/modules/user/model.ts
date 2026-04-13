export class User {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
