import { ILectureService, LectureService } from "./service";
import { LectureRepository } from "./repository";

let lectureService: ILectureService;
export const lectureServiceFactory = (): ILectureService => {
  if (lectureService) {
    return lectureService;
  }

  lectureService = new LectureService({
    repository: new LectureRepository(),
  });
  return lectureService;
};
