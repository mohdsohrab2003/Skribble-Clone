import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { chatService } from "../../services/chat.service.js";
import { scoreService } from "../../services/score.service.js";

import { ChatEmitter } from "../emitters/chat.js";
import { SCORE } from "../../utils/constants.js";
import { timerManager } from "../../managers/TimerManager.js";
import { gameManager } from "../../managers/GameManager.js";
import { finishTurn } from "../helpers/gameFlow.js";
import { GameEmitter } from "../emitters/game.js";

interface ChatPayload {
  message: string;
}

export function registerChat(
  socket: Socket,
  emitter: ChatEmitter,
  gameEmitter: GameEmitter,
) {
  socket.on("chat:message", ({ message }: ChatPayload) => {
    try {
      const room = roomService.getRoomBySocket(socket.id);

      if (!room) {
        return emitter.error(socket, "Room not found");
      }

      const player = room.players.find(
        (player) => player.socketId === socket.id,
      );

      if (!player) {
        return emitter.error(socket, "Player not found");
      }

      const text = message.trim();

      if (!text) return;

      // Drawer cannot chat as a guess
      if (player.id === room.currentDrawer) {
        return;
      }

      // Already guessed
      if (player.hasGuessed) {
        return;
      }

      /**
       * Correct Guess
       */
      if (chatService.isCorrectGuess(room.code, text)) {
        player.hasGuessed = true;

        const guessPoints = scoreService.calculateGuessScore(
          room.timer,
          room.settings.drawTime,
        );

        const drawerPoints = scoreService.calculateDrawerScore(guessPoints);

        scoreService.addScore(room.code, player.id, guessPoints);

        scoreService.addDrawerScore(room.code, drawerPoints);

        emitter.correctGuess(socket);

        const systemMessage = chatService.addSystemMessage(
          room.code,
          `${player.name} guessed the word!`,
        );

        emitter.system(room.code, systemMessage);

        emitter.roomUpdated(room);

        const remainingPlayers = room.players.filter(
          (p) => p.id !== room.currentDrawer && !p.hasGuessed,
        );

        if (remainingPlayers.length === 0) {
          console.log("Everyone guessed!");
          finishTurn(room.code, gameEmitter);

          return;
        }
        return;
      }

      /**
       * Normal Chat
       */
      const chat = chatService.addMessage(
        room.code,
        player.id,
        player.name,
        text,
      );

      emitter.message(room.code, chat);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown Error",
      );
    }
  });
}
