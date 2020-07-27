import { IError } from "middlewares/error.middleware";

interface IConfigError {
  status: number;
  message: string;
}

function verifyEntity(entity: any, config: IConfigError) {
  const { status, message } = config;

  if (!entity) {
    const err: IError = new Error();
    err.status = status;
    err.message = message;
    throw err;
  }
}

export { verifyEntity, IConfigError };
