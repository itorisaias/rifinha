import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const zodErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(422).send(err.errors)
  }

  next(err)
}
