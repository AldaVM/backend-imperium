import { Request, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

const authMidlleware=async (req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization'];
    if(!token){
        const error=new Error();
        error.message="Token is required"
        throw error;
    }
    verify(token,config.JWT_SECRET,(err,decoded:any)=>{
        if(err){
            const error=new Error();
            error.message="Token false"
            throw error;
        }
        (<any>req).user=decoded.user;
         next();
    });
    
}

export default authMidlleware;