import { Stroke } from "../models/Stroke.js";
import { roomManager } from "../managers/RoomManager.js";

class DrawingService {
  /**
   * Get room or throw error
   */
  private getRoom(code: string) {
    const room = roomManager.get(code);

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  /**
   * Get canvas
   */
  getCanvas(roomCode: string): Stroke[] {
    return this.getRoom(roomCode).canvas;
  }

  /**
   * Add new stroke
   */
  addStroke(roomCode: string, stroke: Stroke): Stroke[] {
    const room = this.getRoom(roomCode);

    room.canvas.push(stroke);

    roomManager.update(room);

    return room.canvas;
  }

  /**
   * Undo last stroke
   */
  undo(roomCode: string): Stroke[] {
    const room = this.getRoom(roomCode);

    room.canvas.pop();

    roomManager.update(room);

    return room.canvas;
  }

  /**
   * Clear canvas
   */
  clear(roomCode: string): Stroke[] {
    const room = this.getRoom(roomCode);

    room.canvas = [];

    roomManager.update(room);

    return room.canvas;
  }

  /**
   * Reset canvas
   */
  reset(roomCode: string): void {
    const room = this.getRoom(roomCode);

    room.canvas = [];

    roomManager.update(room);
  }
}

export const drawingService = new DrawingService();
