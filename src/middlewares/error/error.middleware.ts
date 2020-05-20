import { NextFunction, Request, Response } from 'express';
import HttpException from 'etc/exceptions/HttpException';
import { logger } from 'etc/logger/winston';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  logger.error(error.message);
  res.status(200)
    .send({
      error: {
        id: error.id,
        message: error.message
      }
    })
}

export default errorMiddleware