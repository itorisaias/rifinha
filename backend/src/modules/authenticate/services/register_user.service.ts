import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { logger } from "~/logger";

type RegisterUserServiceInput = {
  name: string;
  email: string;
  provider: string;
  password?: string;
};

export class RegisterUserService {
  private readonly logger = logger.child({
    module: "RegisterUserService",
  });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: RegisterUserServiceInput) {
    const contact = await this.prisma.contact.findFirst({
      where: { type: "EMAIL", value: input.email },
      include: { user: true },
    });

    if (contact) {
      this.logger.debug("Register exist update record");
      return this.updateRegister(contact.user_id, input);
    }

    this.logger.debug("Register not exist create record");
    return this.createRegister(input);
  }

  private async updateRegister(
    userId: string,
    input: RegisterUserServiceInput
  ) {
    const { password, ...user } = await this.prisma.user.update({
      where: { id: userId },
      data: { name: input.name, password: input.password },
    });

    return user;
  }

  private async createRegister(input: RegisterUserServiceInput) {
    const { password, ...user } = await this.prisma.user.create({
      data: { name: input.name, password: input.password },
    });

    await this.prisma.contact.create({
      data: {
        user_id: user.id,
        type: "EMAIL",
        confirmed_token: randomUUID(),
        confirmed_token_expierd_at: dayjs().add(7, "days").toDate(),
        value: input.email,
      },
    });

    return user;
  }
}
