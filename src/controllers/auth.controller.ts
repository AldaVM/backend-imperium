import { authService } from "../services";
import {AuthServices} from '../services/auth.service';
import { Request, Response } from "express";


class AuthController{
    private _authService:AuthServices;
    constructor(authService:AuthServices){
        this._authService=authService;
        this.signin=this.signin.bind(this);
        this.signup=this.signup.bind(this);
    }

    async signin(req: Request, res: Response){
        const {body}=req;
        const resp=await this._authService.signin(body);
        return res.status(202).json({
            code:202,
            message: "Login success",
            data: resp
        });
    }



    async signup(req: Request, res: Response){
        const {body}=req;
        const createdUser=await this._authService.signup(body);
        return res.status(201).json({
            code:201,
            message: "User Created",
            data:createdUser
        });
    }

}

const authController=new AuthController(authService);

export{
    authController,
    AuthController
}