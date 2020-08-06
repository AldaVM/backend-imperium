import { generateToken } from "../helpers";
import { IUserServices, userService } from "./user.service";

class AuthServices {
  private _userService: IUserServices;

  constructor(userService: IUserServices) {
    this._userService = userService;
  }

  async signin(user: any) {
    const { email, password } = user;
    const userFind = await this._userService.getUserByUserEmail(email);
    if (!userFind) {
      const error = new Error();
      error.message = 'Not found* user';
      throw error;
    }

    if (!userFind.comparePasswords(password)) {
      const error = new Error();
      error.message = 'Not found user*';
      throw error;
    }
    const userToEncode = {
      name: userFind.name,
      _id: userFind._id,
      email: userFind.email,
      createdAt: userFind.createdAt,
      role: userFind.role
    }

    const token = generateToken(userToEncode);

    return {
      user: userFind,
      token
    }
  }
  //:(
  async signup(user: any) {
    const { email } = user;
    const userFind = await this._userService.getUserByUserEmail(email);
    if (userFind) {
      const error = new Error();
      error.message = "User exists";
      throw error;
    }

    return await this._userService.create(user);
  }

}


const authService = new AuthServices(userService);

export {
  authService,
  AuthServices
}


