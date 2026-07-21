import { Room } from "../models/Room.js";

class RoomManager {
  private rooms = new Map<string, Room>();

  create(room: Room): Room {
    this.rooms.set(room.code, room);
    return room;
  }

  get(code: string): Room | undefined {
    return this.rooms.get(code);
  }

  has(code: string): boolean {
    return this.rooms.has(code);
  }

  update(room: Room): void {
    this.rooms.set(room.code, room);
  }

  delete(code: string): boolean {
    return this.rooms.delete(code);
  }

  getAll(): Room[] {
    return [...this.rooms.values()];
  }

  clear(): void {
    this.rooms.clear();
  }

  count(): number {
    return this.rooms.size;
  }
}

export const roomManager = new RoomManager();
