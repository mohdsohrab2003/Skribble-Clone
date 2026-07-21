import { Room } from "../models/Room.js";
import { GameStatus } from "../types/game.js";

class GameManager {
  /**
   * Start a new game
   */
  startGame(room: Room): Room {
    room.status = "starting";
    room.currentRound = 1;
    room.currentTurn = 0;
    room.currentWord = undefined;
    room.wordChoices = [];
    room.canvas = [];
    room.chat = [];

    room.players.forEach((player) => {
      player.score = 0;
      player.hasGuessed = false;
      player.status = "guessing";
    });

    return room;
  }

  /**
   * Start a round
   */
  startRound(room: Room): Room {
    room.status = "choosing-word";

    room.players.forEach((player) => {
      player.hasGuessed = false;

      if (player.id === room.currentDrawer) {
        player.status = "drawing";
      } else {
        player.status = "guessing";
      }
    });

    return room;
  }

  /**
   * Finish current round
   */
  endRound(room: Room): Room {
    room.status = "round-end";
    room.currentWord = undefined;

    return room;
  }

  /**
   * Finish game
   */
  finishGame(room: Room): Room {
    room.status = "finished";

    return room;
  }

  /**
   * Set current drawer
   */
  setDrawer(room: Room, playerId: string): Room {
    room.currentDrawer = playerId;

    room.players.forEach((player) => {
      player.status = player.id === playerId ? "drawing" : "guessing";
    });

    return room;
  }

  /**
   * Set selected word
   */
  setWord(room: Room, word: string): Room {
    room.currentWord = word;
    room.status = "drawing";

    return room;
  }

  /**
   * Set available word choices
   */
  setWordChoices(room: Room, words: string[]): Room {
    room.wordChoices = words;

    return room;
  }

  /**
   * Update timer
   */
  setTimer(room: Room, seconds: number): Room {
    room.timer = seconds;

    return room;
  }

  /**
   * Clear canvas
   */
  clearCanvas(room: Room): Room {
    room.canvas = [];

    return room;
  }

  /**
   * Check if game has finished
   */
  isGameFinished(room: Room): boolean {
    return room.currentRound > room.settings.rounds;
  }
}

export const gameManager = new GameManager();
