import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import dayjs from 'dayjs'
import { RaffleRepository } from "./raffle.repository";
import { logger } from "~/logger";

export class RaffleController {
  constructor(private readonly raffleRepository: RaffleRepository) {
    logger.debug("RaffleController initilize");
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const schemaCreateRaffle = z.object({
        title: z.string(),
        start_at: z.date().refine((value) => dayjs().isBefore(value), 'start_at should be before today')
      })
      const user_id = req.user?.id!
      const raffle = schemaCreateRaffle.parse(req.body)

      await this.raffleRepository.register({ ...raffle, user_id })

      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  }

  findAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ data: [], meta: {} });
    } catch (error) {
      return next(error);
    }
  }
}
