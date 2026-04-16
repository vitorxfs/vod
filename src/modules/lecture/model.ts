export class Lecture {
  id: string;
  title: string;
  courseId: string;
  position: number;
  url: string;
  progress: LectureProgress[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Lecture>) {
    Object.assign(this, data);
  }
}

export class LectureProgress {
  id: string;
  lectureId: string;
  userId: string;
  completed: boolean;
  elapsedTime: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<LectureProgress>) {
    Object.assign(this, data);
  }
}
