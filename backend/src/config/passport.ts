import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PrismaClient } from "@prisma/client";
import { logger } from "~/logger";
import {
  AuthenticateLocalService,
  RegisterUserService,
} from "~/modules/authenticate/services";

declare module Github {
  export interface Email {
    value: string;
  }
  export interface Photo {
    value: string;
  }
  export interface Json {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company?: any;
    blog: string;
    location: string;
    email: string;
    hireable?: any;
    bio?: any;
    twitter_username?: any;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
  }
  export interface RootObject {
    id: string;
    nodeId: string;
    displayName: string;
    username: string;
    profileUrl: string;
    emails: Email[];
    photos: Photo[];
    provider: string;
    _raw: string;
    _json: Json;
  }
}

export class Passport {
  private readonly logger = logger.child({ module: "Passport" });

  constructor(
    private readonly authenticateLocalService: AuthenticateLocalService,
    private readonly registerUserService: RegisterUserService
  ) {
    this.logger.info("initilize");

    this.loadStrategies();
    this.setupSerializeUser();
    this.setupDeserializeUseR();
  }

  private loadStrategies() {
    passport.use(
      new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req: Request, username, password, done) => {
          try {
            const user = await this.authenticateLocalService.handler({
              email: username,
              password: password,
            });

            return done(null, user);
          } catch (error) {
            this.logger.debug(error);

            return done(new Error("email or password invalid"));
          }
        }
      )
    );

    passport.use(
      new GitHubStrategy(
        {
          clientID: "62f23172d56315510883", //GITHUB_CLIENT_ID,
          clientSecret: "6057faa9cb7a7f8a90d68f2436afbdf9eb025569", //GITHUB_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/api/authenticate/github/callback",
        },
        async (
          _accessToken: any,
          _refreshToken: any,
          profile: Github.RootObject,
          done: any
        ) => {
          const email = profile.emails.at(0)?.value;

          if (!email) {
            throw new Error("strategy not provide email");
          }

          const user = await this.registerUserService.handler({
            name: profile.displayName,
            email: email,
            provider: "GITHUB",
          });

          done(null, user);
        }
      )
    );
  }

  private setupSerializeUser() {
    passport.serializeUser((user, cb) => {
      process.nextTick(() => {
        this.logger.debug(user, "setupSerializeUser");
        cb(null, { ...user });
      });
    });
  }

  private setupDeserializeUseR() {
    passport.deserializeUser((user: any, cb) => {
      process.nextTick(() => {
        this.logger.debug(user, "deserializeUser");
        return cb(null, user);
      });
    });
  }

  static init(prisma: PrismaClient) {
    const authenticateLocalService = new AuthenticateLocalService(prisma);
    const registerUserService = new RegisterUserService(prisma);

    new Passport(authenticateLocalService, registerUserService);
  }

  static isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send();
  };

  static isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];
    logger.debug("isAuthorized", provider);
    // const user = req.user as UserDocument;
    // if (find(user.tokens, { kind: provider })) {
    //     next();
    // } else {
    //     res.redirect(`/auth/${provider}`);
    // }

    next();
  };
}
