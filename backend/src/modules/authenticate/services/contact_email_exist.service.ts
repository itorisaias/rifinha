import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";

type ContactEmailExistServiceInput = string;

export class ContactEmailExistService {
  private readonly logger = logger.child({ module: "ContactEmailExistService" });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: ContactEmailExistServiceInput) {
    const contact = await this.prisma.contact.findFirst({
      where: { type: "EMAIL", value: input },
      include: { user: true },
    });

    return !!contact;
  }
}
