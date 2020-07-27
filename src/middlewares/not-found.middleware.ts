import { Response, NextFunction, Request} from "express";
import { IError } from "./error.middleware";

export default function(req: Request, res: Response, next: NextFunction) {
  const err:IError = new Error("Route not found");
  err.status = 404;
  next(err);
}

