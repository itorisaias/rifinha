import { Application } from "./config/app";
import { Server } from "./config/server";

const { app } = new Application()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

Server.init(app, port)
