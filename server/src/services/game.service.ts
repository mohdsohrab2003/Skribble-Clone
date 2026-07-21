import { Room } from "../models/Room.js";

import { roomManager } from "../managers/RoomManager.js";
import { gameManager } from "../managers/GameManager.js";

import { randomWords } from "../utils/randomWord.js";
import { GameEmitter } from "../socket/emitters/game.js";
import { drawingService } from "./drawing.service.js";

class GameService {
  /**
   * Start a game
   */
  startGame(roomCode: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.players.length < 2) {
      throw new Error("Minimum 2 players required");
    }

    gameManager.startGame(room);

    room.currentRound = 1;
    room.currentTurn = 1;

    const drawer = room.players[0];

    gameManager.setDrawer(room, drawer.id);

    gameManager.setWordChoices(room, randomWords(room.settings.wordChoices));

    roomManager.update(room);

    return room;
  }

  /**
   * Start next turn
   */
  nextTurn(roomCode: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }
    drawingService.clear(room.code);

    console.log("================================");
    console.log("Before Increment");
    console.log("Turn:", room.currentTurn);
    console.log("Players:", room.players.length);
    console.log("Round:", room.currentRound);

    room.currentTurn++;

    console.log("After Increment");
    console.log("Turn:", room.currentTurn);

    if (room.currentTurn > room.players.length) {
      console.log("➡ Moving to next round");
      return this.nextRound(room.code);
    }

    console.log("➡ Starting next drawer");

    const drawer = room.players[room.currentTurn - 1];

    gameManager.setDrawer(room, drawer.id);
    gameManager.setWordChoices(room, randomWords(room.settings.wordChoices));
    gameManager.startRound(room);

    roomManager.update(room);

    return room;
  }

  /**
   * Start next round
   */
  nextRound(roomCode: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    room.currentRound++;

    console.log("Round:", room.currentRound, "/", room.settings.rounds);

    if (room.currentRound > room.settings.rounds) {
      console.log("GAME FINISHED");

      return this.finishGame(room.code);
    }

    room.currentTurn = 1;

    const drawer = room.players[0];

    gameManager.setDrawer(room, drawer.id);
    gameManager.setWordChoices(room, randomWords(room.settings.wordChoices));
    gameManager.startRound(room);

    roomManager.update(room);

    return room;
  }

  /**
   * Player selected word
   */
  chooseWord(roomCode: string, playerId: string, word: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.currentDrawer !== playerId) {
      throw new Error("Only the drawer can choose the word");
    }

    if (!room.wordChoices.includes(word)) {
      throw new Error("Invalid word");
    }

    gameManager.setWord(room, word);

    room.wordChoices = [];

    room.status = "drawing";

    room.timer = room.settings.drawTime;

    roomManager.update(room);

    return room;
  }

  /**
   * End current turn
   */
  endTurn(roomCode: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    gameManager.endRound(room);

    room.status = "round-end";
    room.timer = 0;

    room.players.forEach((player) => {
      player.hasGuessed = false;
    });

    roomManager.update(room);

    return room;
  }

  /**
   * Finish game
   */
  finishGame(roomCode: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    gameManager.finishGame(room);

    room.currentDrawer = undefined;
    room.currentWord = undefined;
    room.wordChoices = [];
    room.timer = 0;
    room.players.forEach((player) => {
      player.hasGuessed = false;
    });

    roomManager.update(room);

    return room;
  }
}

export const gameService = new GameService();
