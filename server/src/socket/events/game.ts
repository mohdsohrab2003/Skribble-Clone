import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { gameService } from "../../services/game.service.js";

import { GameEmitter } from "../emitters/game.js";
import { timerManager } from "../../managers/TimerManager.js";
import { startCountdown, startDrawing } from "../helpers/gameFlow.js";

interface ChooseWordPayload {
  word: string;
}

export function registerGame(socket: Socket, emitter: GameEmitter) {
  socket.on("game:start", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);

      if (!room) {
        return emitter.error(socket, "Room not found");
      }

      const player = room.players.find((p) => p.socketId === socket.id);

      if (!player) {
        return emitter.error(socket, "Player not found");
      }

      if (!player.isHost) {
        return emitter.error(socket, "Only host can start the game");
      }

      if (room.players.length < 2) {
        return emitter.error(socket, "Minimum 2 players required");
      }
      if (room.status !== "waiting") {
        return emitter.error(socket, "Game already started");
      }

      const updatedRoom = gameService.startGame(room.code);

      emitter.gameStarted(updatedRoom);

      startCountdown(updatedRoom.code, emitter);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  });

  socket.on("game:choose-word", ({ word }: ChooseWordPayload) => {
    try {
      console.log("1. received", word);

      const room = roomService.getRoomBySocket(socket.id);

      console.log("2. room", room?.status);

      const player = room?.players.find((p) => p.socketId === socket.id);

      console.log("3. player", player?.id);

      const updatedRoom = gameService.chooseWord(room!.code, player!.id, word);

      console.log("4. chooseWord success");

      timerManager.clear(`${room!.code}:choose-word`);

      startDrawing(updatedRoom.code, emitter);
    } catch (err) {
      console.log("ERROR:", err);
    }
  });
}
