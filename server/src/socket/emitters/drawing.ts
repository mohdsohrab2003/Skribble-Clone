import { Server, Socket } from "socket.io";
import { Stroke } from "../../models/Stroke.js";
import { ServerEvent } from "../../types/socketEvents.js";

export class DrawingEmitter {
  constructor(private io: Server) {}

  draw(roomCode: string, stroke: Stroke) {
    this.io.to(roomCode).emit(ServerEvent.DRAW, stroke);
  }

  undo(roomCode: string) {
    this.io.to(roomCode).emit(ServerEvent.DRAWING_UNDO);
  }

  clear(roomCode: string) {
    this.io.to(roomCode).emit(ServerEvent.DRAWING_CLEAR);
  }

  error(socket: Socket, message: string) {
    socket.emit(ServerEvent.ERROR, { message });
  }
}
