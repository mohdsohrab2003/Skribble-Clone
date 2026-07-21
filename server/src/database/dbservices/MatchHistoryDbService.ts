import { MatchHistoryModel } from "../model/MatchHistoryModel.js";

interface PlayerResult {
  playerId: string;
  playerName: string;
  avatar: string;
  score: number;
  rank: number;
}

interface CreateMatchHistoryData {
  roomCode: string;
  winnerId: string;
  players: PlayerResult[];
  rounds: number;
  duration: number;
}

class MatchHistoryDbService {
  /**
   * Save completed match
   */
  async create(data: CreateMatchHistoryData) {
    return MatchHistoryModel.create(data);
  }

  /**
   * Find by room code
   */
  async findByRoomCode(roomCode: string) {
    return MatchHistoryModel.findOne({ roomCode });
  }

  /**
   * Find by winner
   */
  async findByWinner(winnerId: string) {
    return MatchHistoryModel.find({ winnerId }).sort({
      createdAt: -1,
    });
  }

  /**
   * Recent matches
   */
  async recent(limit = 20) {
    return MatchHistoryModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  }

  /**
   * Delete history
   */
  async delete(roomCode: string) {
    return MatchHistoryModel.deleteOne({
      roomCode,
    });
  }
}

export const matchHistoryDbService = new MatchHistoryDbService();
