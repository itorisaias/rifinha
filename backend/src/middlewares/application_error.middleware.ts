import { NextFunction, Request, Response } from "express";
import { logger } from "~/logger";

export const applicationErrorMiddleware = (
  err: Error,
  _: Partial<Request>,
  res: Response,
  __: NextFunction
) => {
  logger.error(err);

  res.status(500).send(err.message);
};
