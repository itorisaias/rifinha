import { Prisma, PrismaClient, User } from "@prisma/client";
import { createPaginator } from "prisma-pagination";
import { logger } from "~/logger";

type FindUsersServicePaginateInput = Prisma.UserFindManyArgs;

export class FindUsersServicePaginate {
  private readonly logger = logger.child({ module: "FindUsersServicePaginate" });
  private readonly paginate = createPaginator({ perPage: 20 });

  constructor(private readonly prisma: PrismaClient) {
    this.logger.info("initialize");
  }

  public async handler(input: FindUsersServicePaginateInput) {
    return await this.paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      input
    );
  }
}
