import { Course } from "./model";
import { CourseRepository } from "./repository";

export interface ICourseService {
  create(instance: Course): Promise<Course>;
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  update(id: string, data: Partial<Course>): Promise<Course | null>;
  delete(id: string): Promise<boolean>;
}

export interface CourseServiceDependencies {
  repository: CourseRepository;
}

export class CourseService implements ICourseService {
  private repository: CourseRepository;

  constructor(deps: CourseServiceDependencies) {
    this.repository = deps.repository;
  }

  async create(instance: Course): Promise<Course> {
    console.log(instance);
    return this.repository.create(instance);
  }

  async findAll(): Promise<Course[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Course | null> {
    return this.repository.findById(id);
  }

  async update(id: string, data: Partial<Course>): Promise<Course | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
