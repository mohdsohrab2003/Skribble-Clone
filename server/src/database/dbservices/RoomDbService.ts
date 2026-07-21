import { RoomModel } from "../model/RoomModel.js";

interface CreateRoomData {
  roomCode: string;
  hostId: string;
  playerIds: string[];
  settings: any;
  status:
    | "waiting"
    | "starting"
    | "choosing-word"
    | "drawing"
    | "round-end"
    | "finished";
}

class RoomDbService {
  /**
   * Create room
   */
  async create(data: CreateRoomData) {
    return RoomModel.create(data);
  }

  /**
   * Find room by room code
   */
  async findByCode(roomCode: string) {
    return RoomModel.findOne({ roomCode });
  }

  /**
   * Update room
   */
  async update(roomCode: string, data: Partial<CreateRoomData>) {
    return RoomModel.findOneAndUpdate({ roomCode }, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Add player
   */
  async addPlayer(roomCode: string, playerId: string) {
    return RoomModel.findOneAndUpdate(
      { roomCode },
      {
        $addToSet: {
          playerIds: playerId,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Remove player
   */
  async removePlayer(roomCode: string, playerId: string) {
    return RoomModel.findOneAndUpdate(
      { roomCode },
      {
        $pull: {
          playerIds: playerId,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Update room status
   */
  async updateStatus(
    roomCode: string,
    status: "waiting" | "playing" | "finished",
  ) {
    return RoomModel.findOneAndUpdate({ roomCode }, { status }, { new: true });
  }

  /**
   * Transfer host
   */
  async updateHost(roomCode: string, hostId: string) {
    return RoomModel.findOneAndUpdate({ roomCode }, { hostId }, { new: true });
  }

  /**
   * Finish room
   */
  async finish(roomCode: string) {
    return RoomModel.findOneAndUpdate(
      { roomCode },
      {
        status: "finished",
        endedAt: new Date(),
      },
      { new: true },
    );
  }

  /**
   * Delete room
   */
  async delete(roomCode: string) {
    return RoomModel.deleteOne({ roomCode });
  }
}

export const roomDbService = new RoomDbService();
