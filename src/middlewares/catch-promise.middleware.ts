import { Response, Request, NextFunction } from "express";
import { IError } from "./error.middleware";


export default function(
  ftn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return ftn(req, res, next);
    }
    catch (error) {
      const err: IError = new Error(error.message);
      err.status = 500;

      next(err);
    }
  };
}


