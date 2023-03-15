import express, { Express } from "express";
import expressSession from "express-session";
import passport from "passport";
import expressPino from "express-pino-logger";
import { prisma } from "./database";
import { Passport } from "./passport";

import * as middlewares from "~/middlewares";
import { AuthenticateRouter } from "~/modules/authenticate/authenticate.router";
import { RaffleRouter } from "~/modules/raffle/raffle.router";
import { logger } from "~/logger";

export class Application {
  public readonly app: Express;

  constructor() {
    this.app = express();

    Passport.init(prisma);

    this.middleware().routes().errorHandlers();
  }

  private middleware() {
    this.app
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(expressPino({ logger }))
      .use(
        expressSession({
          secret: "secret",
          resave: false,
          saveUninitialized: false,
        })
      )
      .use(passport.initialize())
      .use(passport.session())
      .use(passport.authenticate("session"));

    return this;
  }

  private routes() {
    this.app.use("/api", [AuthenticateRouter.init()]);

    return this;
  }

  private errorHandlers() {
    this.app
      .use(middlewares.zodErrorMiddleware)
      .use(middlewares.applicationErrorMiddleware);

    return this;
  }
}
