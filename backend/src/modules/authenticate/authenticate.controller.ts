import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { logger } from "~/logger";
import { EmailExistException } from "./exceptions";
import {
  ContactEmailExistService,
  RegisterUserService,
  UserInfoService,
} from "./services";

export class AuthenticateController {
  private readonly logger = logger.child({ module: "AuthenticateController" });

  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly userInfoService: UserInfoService,
    private readonly contactEmailExistService: ContactEmailExistService
  ) {
    this.logger.info("initialize");
  }

  public signIn(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z.string(),
          email: z.string(),
          passport: z.string(),
          confirm_password: z.string(),
        })
        .refine((values) => values.passport === values.confirm_password, {
          path: ["confirm_password"],
          message: "Confirm password not match",
        });

      const user = userSchema.parse(req.body);

      const existEmail = await this.contactEmailExistService.handler(
        user.email
      );

      if (existEmail) {
        throw new EmailExistException("e-mail exist");
      }

      await this.registerUserService.handler({
        ...user,
        provider: "LOCAL",
      });
      res.status(201).send();
    } catch (error) {
      return next(error);
    }
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.logout((err) => {
        if (err) return next(err);

        res.send();
      });
    } catch (error) {
      return next(error);
    }
  }

  public async userInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo = await this.userInfoService.handler({
        user_id: req.user!.id,
      });

      return res.status(200).json(userInfo);
    } catch (err) {
      return next(err);
    }
  }
}
