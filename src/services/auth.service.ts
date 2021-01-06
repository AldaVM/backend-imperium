import { generateToken } from "../helpers";
import { IUserServices, userService } from "./user.service";
import { IError } from "../middlewares/error.middleware";

class AuthServices {
  private _userService: IUserServices;

  constructor(userService: IUserServices) {
    this._userService = userService;
  }

  async signin(user: any) {
    try {
      const { email, password } = user;
      const userFind = await this._userService.getUserByUserEmail(email);

      if (userFind?.user == null) {
        return userFind;
      }

      if (!userFind?.user.comparePasswords(password)) {
        return {
          ok: false,
          status: 401,
          message: "Problema en la autenticación",
          user: null,
        };
      }

      const userToEncode = {
        name: userFind?.user.name,
        _id: userFind?.user._id,
        email: userFind?.user.email,
        createdAt: userFind?.user.createdAt,
        role: userFind?.user.role,
      };

      const token = generateToken(userToEncode);

      return {
        ...userFind,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error",
        error,
      };
    }
  }
  //:(
  async signup(user: any) {
    const { email } = user;
    const userFind = await this._userService.getUserByUserEmail(email);
    if (userFind) {
      const error: IError = new Error();
      error.message = "User exists";
      error.status = 404;
      throw error;
    }

    return await this._userService.create(user);
  }
}

const authService = new AuthServices(userService);

export { authService, AuthServices };
