import { ServerOptions, Server } from "socket.io";
import { env } from "./env.js";

import { Server as HttpServer } from "http";

export const socketConfig: Partial<ServerOptions> = {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
};

export function createSocketServer(server: HttpServer): Server {
  return new Server(server, socketConfig);
}
