import { BaseController } from "./base.controller";
import { IUserServices } from "services/user.service";
import {userService} from '../services';
import { Response,Request } from "express";


class UserController extends BaseController{
    private _userService: IUserServices;

    constructor(userService:IUserServices){
        super(userService);
        this._userService=userService;
        this.getUserByUserEmail=this.getUserByUserEmail.bind(this);
    }

    async getUserByUserEmail(req: Request, res: Response){
        const {email}=req.body;
        const user=await this._userService.getUserByUserEmail(email);
        return res.status(200).json({
            code:200,
            message: "User detected",
            data: user,
        });
    }

}

const userController=new UserController(userService);

export{
    userController,
    UserController
}