import { BaseService, IBaseService } from "./base.service";
import { IUserRepository } from "repositories/user.repository";
import { userRepository } from '../repositories';

interface IUserServices extends IBaseService {
  getUserByUserEmail(email: string): Promise<any>;
}

class UserServices extends BaseService {

  private _userService: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super(userRepository);
    this._userService = userRepository;
    this.getUserByUserEmail = this.getUserByUserEmail.bind(this);
  }

  async getUserByUserEmail(email: string) {
    return await this._userService.getUserByUserEmail(email);
  }

}

const userService: IUserServices = new UserServices(userRepository);

export {
  userService,
  UserServices,
  IUserServices
}