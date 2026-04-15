import { Lecture } from "../lecture/model";

export class Course {
  id: string;
  name: string;
  lectures: Lecture[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Course>) {
    Object.assign(this, data);
  }
}
