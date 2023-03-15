import { Raffle } from "./raffle.model";

export interface IRaffleRepository {
  register(raffle: Partial<Raffle>): Promise<void>
  findById(id: string): Promise<Raffle>
}
