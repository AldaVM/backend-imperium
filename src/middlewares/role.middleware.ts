import { NextFunction, Request, Response } from "express";
import { IError } from "./error.middleware";

const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (<any>req).user;
    if (user.role === "SUPER") {
      next();
    } else {
      const error: IError = new Error();
      error.status = 401;
      error.message = "You don't have the credentials";
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export default roleMiddleware;
