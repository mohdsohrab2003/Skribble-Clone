import { nanoid } from "nanoid";

import { ChatMessage } from "../models/ChatMessage.js";
import { roomManager } from "../managers/RoomManager.js";

class ChatService {
  /**
   * Get room by code
   */
  private getRoom(code: string) {
    const room = roomManager.get(code);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  /**
   * Add a player's chat message
   */
  addMessage(
    roomCode: string,
    playerId: string,
    playerName: string,
    message: string,
  ): ChatMessage {
    const room = this.getRoom(roomCode);

    const chat: ChatMessage = {
      id: nanoid(),
      playerId,
      playerName,
      message: message.trim(),
      createdAt: Date.now(),
      isSystem: false,
      isCorrect: false,
    };

    room.chat.push(chat);

    roomManager.update(room);

    return chat;
  }

  /**
   * Add a system message
   */
  addSystemMessage(roomCode: string, message: string): ChatMessage {
    const room = this.getRoom(roomCode);

    const chat: ChatMessage = {
      id: nanoid(),
      playerId: "",
      playerName: "System",
      message,
      createdAt: Date.now(),
      isSystem: true,
      isCorrect: false,
    };

    room.chat.push(chat);

    roomManager.update(room);

    return chat;
  }

  /**
   * Check if a player's guess matches the current word
   */
  isCorrectGuess(roomCode: string, guess: string): boolean {
    const room = this.getRoom(roomCode);

    if (!room.currentWord) {
      return false;
    }

    const answer = room.currentWord.trim().toLowerCase();
    const playerGuess = guess.trim().toLowerCase();

    return answer === playerGuess;
  }

  /**
   * Get all chat messages
   */
  getMessages(roomCode: string): ChatMessage[] {
    return this.getRoom(roomCode).chat;
  }

  /**
   * Clear chat history
   */
  clear(roomCode: string): void {
    const room = this.getRoom(roomCode);

    room.chat = [];

    roomManager.update(room);
  }
}

export const chatService = new ChatService();
