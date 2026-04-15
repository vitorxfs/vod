import { userServiceFactory } from '../user/factories';
import { AuthService, IAuthService } from "./service";

let authService: IAuthService;
export const authServiceFactory = (): IAuthService => {
  if (authService) {
    return authService;
  }

  authService = new AuthService({
    userService: userServiceFactory(),
  });
  return authService;
};
