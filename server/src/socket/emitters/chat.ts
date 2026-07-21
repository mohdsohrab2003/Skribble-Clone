import { Server, Socket } from "socket.io";
import { ChatMessage } from "../../models/ChatMessage.js";
import { Room } from "../../models/Room.js";
import { ServerEvent } from "../../types/socketEvents.js";

export class ChatEmitter {
  constructor(private io: Server) {}

  message(roomCode: string, message: ChatMessage) {
    this.io.to(roomCode).emit(ServerEvent.CHAT_NEW, message);
  }

  system(roomCode: string, message: ChatMessage) {
    this.io.to(roomCode).emit(ServerEvent.CHAT_NEW, message);
  }

  correctGuess(socket: Socket) {
    socket.emit(ServerEvent.CHAT_CORRECT);
  }

  roomUpdated(room: Room) {
    this.io.to(room.code).emit(ServerEvent.ROOM_UPDATED, room);
  }

  error(socket: Socket, message: string) {
    socket.emit(ServerEvent.ERROR, { message });
  }
}
