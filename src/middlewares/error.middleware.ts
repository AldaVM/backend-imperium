import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  status?: number;
}

function errorGeneric(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
}

export { errorGeneric, IError};
