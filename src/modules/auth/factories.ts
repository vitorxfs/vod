import { UserRepository } from "../user/repository";
import { AuthService, IAuthService } from "./service";

let authService: IAuthService;
export const authServiceFactory = (): IAuthService => {
  if (authService) {
    return authService;
  }

  authService = new AuthService({
    repository: new UserRepository(),
  });
  return authService;
};
