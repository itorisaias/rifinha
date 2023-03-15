import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";

type UserInfoServiceInput = {
  user_id: string;
};

export class UserInfoService {
  private readonly logger = logger.child({ module: "UserInfoService" });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: UserInfoServiceInput) {
    return this.prisma.user.findFirstOrThrow({
      where: { id: input.user_id },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
        contacts: {
          select: {
            type: true,
            value: true,
            created_at: true,
            confirmed_at: true,
          },
        },
      },
    });
  }
}
