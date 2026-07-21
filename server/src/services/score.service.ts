import { Player } from "../models/Player.js";
import { roomManager } from "../managers/RoomManager.js";

class ScoreService {
  private getRoom(code: string) {
    const room = roomManager.get(code);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  /**
   * Award score to player
   */
  addScore(roomCode: string, playerId: string, points: number): Player {
    const room = this.getRoom(roomCode);

    const player = room.players.find((p) => p.id === playerId);

    if (!player) {
      throw new Error("Player not found");
    }

    player.score += points;

    roomManager.update(room);

    return player;
  }

  /**
   * Award score to drawer
   */
  addDrawerScore(roomCode: string, points: number): Player | undefined {
    const room = this.getRoom(roomCode);

    const drawer = room.players.find((p) => p.id === room.currentDrawer);

    if (!drawer) return;

    drawer.score += points;

    roomManager.update(room);

    return drawer;
  }

  /**
   * Get leaderboard
   */
  getLeaderboard(roomCode: string): Player[] {
    const room = this.getRoom(roomCode);

    return [...room.players].sort((a, b) => b.score - a.score);
  }

  /**
   * Reset all scores
   */
  resetScores(roomCode: string): void {
    const room = this.getRoom(roomCode);

    room.players.forEach((player) => {
      player.score = 0;
    });

    roomManager.update(room);
  }

  /**
   * Get winner
   */
  getWinner(roomCode: string): Player | undefined {
    return this.getLeaderboard(roomCode)[0];
  }
  calculateGuessScore(timeLeft: number, roundTime: number): number {
    const MIN_SCORE = 100;
    const MAX_BONUS = 100;

    const bonus = Math.floor((timeLeft / roundTime) * MAX_BONUS);

    return MIN_SCORE + bonus;
  }

  calculateDrawerScore(guessPoints: number): number {
    return Math.floor(guessPoints * 0.4);
  }
}

export const scoreService = new ScoreService();
