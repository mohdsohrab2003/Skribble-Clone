import { Server, Socket } from "socket.io";
import { Room } from "../../models/Room.js";
import { ServerEvent } from "../../types/socketEvents.js";

export class RoomEmitter {
  constructor(private io: Server) {}

  roomCreated(socket: Socket, room: Room) {
    socket.emit(ServerEvent.ROOM_CREATED, room);
  }

  roomUpdated(room: Room) {
    this.io.to(room.code).emit(ServerEvent.ROOM_UPDATED, room);
  }

  playerJoined(room: Room) {
    this.io.to(room.code).emit(ServerEvent.PLAYER_JOINED, room);
  }

  playerLeft(room: Room) {
    this.io.to(room.code).emit(ServerEvent.PLAYER_LEFT, room);
  }

  error(socket: Socket, message: string) {
    socket.emit(ServerEvent.ERROR, {
      message,
    });
  }
}
