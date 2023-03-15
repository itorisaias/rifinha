import { Router } from "express";
import passport from "passport";
import { prisma } from "~/config/database";
import { Passport } from "~/config/passport";
import { AuthenticateController } from "./authenticate.controller";
import {
  ContactEmailExistService,
  RegisterUserService,
  UserInfoService,
} from "./services";

export class AuthenticateRouter {
  static init() {
    const router = Router();
    const registerUserService = new RegisterUserService(prisma);
    const userInfoService = new UserInfoService(prisma);
    const contactEmailExistService = new ContactEmailExistService(prisma);
    const authenticateController = new AuthenticateController(
      registerUserService,
      userInfoService,
      contactEmailExistService
    );

    return (
      router
        // Flow local
        .post(
          "/authenticate/local/sign_in",
          passport.authenticate("local"),
          (req, res, next) => authenticateController.signIn(req, res, next)
        )
        .post("/authenticate/local/sign_up", (req, res, next) =>
          authenticateController.signUp(req, res, next)
        )
        // Flow Github
        .get(
          "/authenticate/github/sign_in",
          passport.authenticate("github", { scope: ["user.email"] })
        )
        .get(
          "/authenticate/github/callback",
          passport.authenticate("github"),
          (req, res, next) => authenticateController.signIn(req, res, next)
        )
        // Flow Common
        .get("/authenticate/logout", (req, res, next) =>
          authenticateController.logout(req, res, next)
        )
        .get("/authenticate", Passport.isAuthenticated, (req, res, next) =>
          authenticateController.userInfo(req, res, next)
        )
    );
  }
}
