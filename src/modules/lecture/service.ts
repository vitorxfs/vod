import { Lecture } from "./model";
import { LectureRepository } from "./repository";

export interface ILectureService {
  create(instance: Lecture): Promise<Lecture>;
  findAll(): Promise<Lecture[]>;
  findById(id: string): Promise<Lecture | null>;
  update(id: string, data: Partial<Lecture>): Promise<Lecture | null>;
  delete(id: string): Promise<boolean>;
}

export interface LectureServiceDependencies {
  repository: LectureRepository;
}

export class LectureService implements ILectureService {
  private repository: LectureRepository;

  constructor(deps: LectureServiceDependencies) {
    this.repository = deps.repository;
  }

  async create(instance: Lecture): Promise<Lecture> {
    return this.repository.create(instance);
  }

  async findAll(): Promise<Lecture[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Lecture | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<Lecture>): Promise<Lecture | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
