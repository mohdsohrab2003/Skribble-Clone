import { nanoid } from "nanoid";

import { Room } from "../models/Room.js";

import { roomManager } from "../managers/RoomManager.js";
import { playerService } from "./player.service.js";

import { DEFAULT_GAME_SETTINGS } from "../utils/constants.js";
import { generateRoomCode } from "../utils/generateRoomCode.js";
import { gameManager } from "../managers/GameManager.js";
import { GameSettings } from "../types/game.js";

class RoomService {
  /**
   * Get room or throw error
   */
  private getRoomOrThrow(code: string): Room {
    const room = roomManager.get(code);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  /**
   * Create room
   */
  createRoom(
    socketId: string,
    playerName: string,
    avatarId: number,
    settings: GameSettings,
    language: string,
  ): Room {
    let code = generateRoomCode();

    while (roomManager.has(code)) {
      code = generateRoomCode();
    }

    const host = playerService.createPlayer(
      socketId,
      playerName,
      avatarId,
      true,
    );

    const room: Room = {
      id: nanoid(),

      code,

      players: [host],

      hostId: host.id,

      status: "waiting",

      // ✅ Use settings from client
      settings: {
        ...DEFAULT_GAME_SETTINGS,
        ...settings,
        language,
      },

      currentRound: 0,
      currentTurn: 0,

      currentDrawer: undefined,

      chooseWordTime:
        settings.chooseWordTime ?? DEFAULT_GAME_SETTINGS.chooseWordTime,

      currentWord: undefined,

      wordChoices: [],

      timer: 0,

      canvas: [],

      chat: [],

      createdAt: Date.now(),
    };

    roomManager.create(room);

    console.log("Room Created:", {
      code: room.code,
      rounds: room.settings.rounds,
      drawTime: room.settings.drawTime,
      chooseWordTime: room.settings.chooseWordTime,
      maxPlayers: room.settings.maxPlayers,
      wordChoices: room.settings.wordChoices,
      language: room.settings.language,
    });

    return room;
  }

  /**
   * Get room
   */
  getRoom(code: string): Room | undefined {
    return roomManager.get(code);
  }

  /**
   * Join room
   */
  joinRoom(
    code: string,
    socketId: string,
    name: string,
    avatarId: number,
    language: string,
  ): Room {
    const room = this.getRoomOrThrow(code);

    if (room.players.length >= room.settings.maxPlayers) {
      throw new Error("Room is full");
    }

    const exists = room.players.find(
      (player) => player.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      throw new Error("Player name already exists");
    }

    const player = playerService.createPlayer(socketId, name, avatarId);

    room.players.push(player);

    roomManager.update(room);

    return room;
  }

  /**
   * Leave room
   */
  leaveRoom(code: string, playerId: string): Room | null {
    const room = this.getRoomOrThrow(code);

    room.players = playerService.removePlayer(room.players, playerId);

    if (room.players.length === 0) {
      roomManager.delete(code);
      return null;
    }

    const host = room.players.find((player) => player.isHost);

    if (!host) {
      playerService.transferHost(room.players);
      room.hostId = room.players[0].id;
    }

    roomManager.update(room);

    return room;
  }

  /**
   * Update settings
   */
  updateSettings(code: string, settings: Partial<Room["settings"]>): Room {
    const room = this.getRoomOrThrow(code);

    room.settings = {
      ...room.settings,
      ...settings,
    };

    roomManager.update(room);

    return room;
  }

  /**
   * Delete room
   */
  deleteRoom(code: string): void {
    roomManager.delete(code);
  }

  /**
   * Find room by socket
   */
  getRoomBySocket(socketId: string): Room | undefined {
    return roomManager
      .getAll()
      .find((room) =>
        room.players.some((player) => player.socketId === socketId),
      );
  }

  /**
   * Find room by reconnect token
   */
  getRoomByReconnectToken(token: string): Room | undefined {
    return roomManager
      .getAll()
      .find((room) =>
        room.players.some((player) => player.reconnectToken === token),
      );
  }

  chooseWord(roomCode: string, playerId: string, word: string): Room {
    const room = roomManager.get(roomCode);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.currentDrawer !== playerId) {
      throw new Error("Only the drawer can choose a word");
    }

    if (!room.wordChoices.includes(word)) {
      throw new Error("Invalid word selected");
    }

    gameManager.setWord(room, word);

    roomManager.update(room);

    return room;
  }
}

export const roomService = new RoomService();
