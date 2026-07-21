import { Server } from "socket.io";
import { Server as HttpServer } from "http";

import { createSocketServer } from "../config/socket.js";
import { registerEvents } from "./registerEvents.js";
import { logger } from "../utils/logger.js";

export function initializeSocket(server: HttpServer): Server {
  const io = createSocketServer(server);

  io.on("connection", (socket) => {
    logger.info(`Socket Connected: ${socket.id}`);

    registerEvents(io, socket);

    socket.on("disconnect", () => {
      logger.info(`Socket Disconnected: ${socket.id}`);
    });
  });

  return io;
}
