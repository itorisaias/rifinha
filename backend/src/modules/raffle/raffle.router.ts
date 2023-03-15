import { Router } from "express";
import { prisma } from "~/config/database";
import { Passport } from "~/config/passport";
import { RaffleController } from "./raffle.controller";
import { RaffleRepository } from "./raffle.repository";

export class RaffleRouter {
  static init() {
    const router = Router();
    const raffleRepository = new RaffleRepository(prisma)
    const raffleController = new RaffleController(raffleRepository);

    return router
      .use(Passport.isAuthenticated)
      .post("/raffle", (req, res, next) =>
        raffleController.create(req, res, next)
      )
      .get("/raffle", (req, res, next) =>
        raffleController.findAll(req, res, next)
      );
  }
}
