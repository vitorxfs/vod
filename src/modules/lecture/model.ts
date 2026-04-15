export class Lecture {
  id: string;
  title: string;
  courseId: string;
  position: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Lecture>) {
    Object.assign(this, data);
  }
}
