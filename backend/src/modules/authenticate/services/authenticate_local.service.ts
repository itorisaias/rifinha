import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";

type AuthenticateLocalServiceInput = {
  email: string;
  password: string;
};

export class AuthenticateLocalService {
  private readonly logger = logger.child({ module: "AuthenticateLocalService" });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: AuthenticateLocalServiceInput) {
    const contact = await this.prisma.contact.findFirstOrThrow({
      where: { value: input.email, type: "EMAIL" },
      include: { user: true },
    });

    const { password, ...user } = contact.user

    if (password !== input.password) {
      throw new Error("invalid password");
    }

    return user;
  }
}
