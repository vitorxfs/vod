export class Course {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Course>) {
    Object.assign(this, data);
  }
}
