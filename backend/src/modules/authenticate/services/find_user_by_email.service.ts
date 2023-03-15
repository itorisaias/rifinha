import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";

type FindUserByEmailServiceInput = string;

export class FindUserByEmailService {
  private readonly logger = logger.child({ module: "FindUserByEmailService" });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: FindUserByEmailServiceInput) {
    const { user } = await this.prisma.contact.findFirstOrThrow({
      where: { type: "EMAIL", value: input },
      include: { user: true },
    });

    return user;
  }
}
