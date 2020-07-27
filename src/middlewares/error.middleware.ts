import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  status?: number;
}

function ErrorGeneric(
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

export { ErrorGeneric, IError};
