import { ICourseService, CourseService } from "./service";
import { CourseRepository } from "./repository";

let courseService: ICourseService;
export const courseServiceFactory = (): ICourseService => {
  if (courseService) {
    return courseService;
  }

  courseService = new CourseService({
    repository: new CourseRepository(),
  });
  return courseService;
};
