import http from "http";
import { Express } from "express";
import { logger } from "~/logger";
import { prisma } from "./database";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    { module: "Server" },
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  );
  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(
    { module: "Server" },
    `App exiting due to an uncaught exception: ${error}`
  );
  process.exit(ExitStatus.Failure);
});

export class Server {
  private server?: http.Server;
  private readonly logger = logger.child({ module: "Server" });

  private constructor(
    private readonly app: Express,
    private readonly port: number
  ) {}

  private start() {
    this.server = http.createServer(this.app).listen(this.port, () => {
      this.logger.info(`Server listening on port: ${this.port}`);
    });
  }

  private async close() {
    await prisma.$connect();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  static init(app: Express, port: number) {
    try {
      const server = new Server(app, port);
      server.start();

      const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];
      for (const exitSignal of exitSignals) {
        process.on(exitSignal, async () => {
          try {
            await server.close();
            logger.info({ module: "Server" }, `App exited with success`);
            process.exit(ExitStatus.Success);
          } catch (error) {
            logger.error(
              { module: "Server" },
              `App exited with error: ${error}`
            );
            process.exit(ExitStatus.Failure);
          }
        });
      }
    } catch (error) {
      logger.error({ module: "Server" }, `App exited with error: ${error}`);
      process.exit(ExitStatus.Failure);
    }
  }
}
