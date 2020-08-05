import { NextFunction, Request, Response } from "express";

const roleMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const user=(<any>req).user;
    if(user.role==='SUPER'){
        next();
    }else{
       const error=new Error();
       error.message="You don't have the credentials";
       throw error;
    }
}

export default roleMiddleware;