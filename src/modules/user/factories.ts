import { UserRepository } from "./repository";
import { IUserService, UserService } from "./service";

let userService: IUserService;
export const userServiceFactory = (): IUserService => {
  if (userService) {
    return userService;
  }

  userService = new UserService({
    repository: new UserRepository(),
  });
  return userService;
};
