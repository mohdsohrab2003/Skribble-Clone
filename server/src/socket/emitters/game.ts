import { Server, Socket } from "socket.io";
import { Room } from "../../models/Room.js";
import { ServerEvent } from "../../types/socketEvents.js";
// import { userDbService } from "../../database/dbservices/UserDbService.js";

export class GameEmitter {
  constructor(private io: Server) {}

  gameStarted(room: Room) {
    this.io.to(room.code).emit(ServerEvent.GAME_STARTED, room);
  }

  wordChoices(socket: Socket, words: string[]) {
    socket.emit(ServerEvent.WORD_CHOICES, words);
  }

  roundStarted(room: Room) {
    this.io.to(room.code).emit(ServerEvent.ROUND_STARTED, room);
  }

  roundEnded(room: Room) {
    this.io.to(room.code).emit(ServerEvent.ROUND_ENDED, room);
  }

  gameFinished(room: Room) {
    this.io.to(room.code).emit(ServerEvent.GAME_FINISHED, room);
  }

  error(socket: Socket, message: string) {
    socket.emit(ServerEvent.ERROR, { message });
  }

  sendWordChoices(room: Room) {
    const drawer = room.players.find((p) => p.id === room.currentDrawer);

    if (!drawer) return;

    this.io.to(drawer.socketId).emit(ServerEvent.WORD_CHOICES, {
      drawerId: room.currentDrawer,
      words: room.wordChoices,
    });
  }

  countdown(room: Room, count: number) {
    this.io.to(room.code).emit(ServerEvent.GAME_COUNTDOWN, count);
  }

  timer(room: Room, seconds: number) {
    this.io.to(room.code).emit(ServerEvent.GAME_TIMER, seconds);
  }
  roomUpdated(room: Room) {
    this.io.to(room.code).emit("room:updated", room);
  }
  clearCanvas(roomCode: string) {
    this.io.to(roomCode).emit(ServerEvent.DRAWING_CLEAR);
  }
}
