import { HttpException } from '@nestjs/common';

export function handleHTTPException(
  error: unknown | Error | string,
  statusCode = 500,
): never {
  if (error instanceof Error) {
    const errorString = error.message.match(/{.*}/);
    const errObject = errorString
      ? JSON.parse(errorString[0])
      : { message: error.message };

    errObject.message = errObject.message.replace(/"/g, "'");

    throw new HttpException(errObject.message, errObject.code || statusCode);
  } else if (typeof error === 'string') {
    throw new HttpException(error, statusCode);
  }

  throw new HttpException('internal server error', statusCode);
}
