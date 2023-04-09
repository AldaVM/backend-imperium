import { Request, NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IError } from "./error.middleware";

const authMidlleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      const error: IError = new Error();
      error.status = 401;
      error.message = "Token is required";
      throw error;
    }
    verify(token, config.JWT_SECRET, (err, decoded: any) => {
 
      if (err) {
        const error: IError = new Error();
        error.status = 401;
        error.message = "Token false";
        console.log(err);
        throw error;
      }
      (<any>req).user = decoded.user;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default authMidlleware;
