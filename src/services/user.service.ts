import { BaseService, IBaseService } from "./base.service";
import { IUserRepository } from "repositories/user.repository";
import { userRepository } from "../repositories";

interface IUserServices extends IBaseService {
  getUserByUserEmail(email: string): Promise<any>;
}

class UserServices extends BaseService {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super(userRepository);
    this._userRepository = userRepository;
    this.getUserByUserEmail = this.getUserByUserEmail.bind(this);
  }

  async getUserByUserEmail(email: string) {
    try {
      const user = await this._userRepository.getUserByUserEmail(email);

      if (!user) {
        return {
          ok: false,
          status: 404,
          message: "Usuario no encontrado",
          user: null,
        };
      }

      return {
        ok: true,
        status: 200,
        message: "Usuario encontrado",
        user,
      };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: "Error en el servicio",
        detail: error,
      };
    }
  }
}

const userService: IUserServices = new UserServices(userRepository);

export { userService, UserServices, IUserServices };
