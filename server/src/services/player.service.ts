import { nanoid } from "nanoid";

import { Player } from "../models/Player.js";

class PlayerService {
  /**
   * Create a new player
   */
  createPlayer(
    socketId: string,
    name: string,
    avatarId: number,
    isHost = false,
  ): Player {
    return {
      id: nanoid(),
      socketId,
      reconnectToken: nanoid(),

      name: name.trim(),
      avatarId,

      score: 0,

      isHost,

      hasGuessed: false,

      status: "waiting",

      connected: true,

      joinedAt: Date.now(),
    };
  }

  /**
   * Find player by id
   */
  getPlayer(players: Player[], playerId: string) {
    return players.find((player) => player.id === playerId);
  }

  /**
   * Find player by socket
   */
  getPlayerBySocket(players: Player[], socketId: string) {
    return players.find((player) => player.socketId === socketId);
  }

  /**
   * Remove player
   */
  removePlayer(players: Player[], playerId: string): Player[] {
    return players.filter((player) => player.id !== playerId);
  }

  /**
   * Transfer host
   */
  transferHost(players: Player[]) {
    if (!players.length) return;

    players.forEach((player) => {
      player.isHost = false;
    });

    players[0].isHost = true;
  }

  /**
   * Reset guessed state
   */
  resetGuesses(players: Player[]) {
    players.forEach((player) => {
      player.hasGuessed = false;
    });
  }

  /**
   * Reset scores
   */
  resetScores(players: Player[]) {
    players.forEach((player) => {
      player.score = 0;
    });
  }

  markDisconnected(players: Player[], socketId: string): Player | undefined {
    const player = players.find((player) => player.socketId === socketId);

    if (!player) return;

    player.connected = false;

    return player;
  }

  reconnectPlayer(
    players: Player[],
    reconnectToken: string,
    socketId: string,
  ): Player | undefined {
    const player = players.find(
      (player) => player.reconnectToken === reconnectToken,
    );

    if (!player) return;

    player.socketId = socketId;
    player.connected = true;

    return player;
  }
}

export const playerService = new PlayerService();
