import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";
import { Raffle } from "./contracts/raffle.model";
import { IRaffleRepository } from "./contracts/raffle.repository";

export class RaffleRepository implements IRaffleRepository {
  constructor(private readonly prisma: PrismaClient) {
    logger.debug("RaffleRepository initilize");
  }

  async register(raffle: Partial<Raffle>): Promise<void> {
    // this.prisma.raffle.create({ data: raffle })
  }

  async findById(id: string): Promise<Raffle> {
    throw new Error("Method not implemented.");
  }

}