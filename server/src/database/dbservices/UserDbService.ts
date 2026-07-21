import { UserModel } from "../model/UserModel.js";

interface CreateUserData {
  username: string;
  avatar: string;
}

class UserDbService {
  /**
   * Create user
   */
  async create(data: CreateUserData) {
    return UserModel.create(data);
  }

  /**
   * Find by ID
   */
  async findById(id: string) {
    return UserModel.findById(id);
  }

  /**
   * Find by username
   */
  async findByUsername(username: string) {
    return UserModel.findOne({ username });
  }

  /**
   * Update profile
   */
  async update(id: string, data: Partial<CreateUserData>) {
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Update player statistics
   */
  async updateStats(id: string, score: number, isWinner: boolean) {
    return UserModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          gamesPlayed: 1,
          totalScore: score,
          gamesWon: isWinner ? 1 : 0,
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Leaderboard
   */
  async leaderboard(limit = 10) {
    return UserModel.find()
      .sort({
        totalScore: -1,
        gamesWon: -1,
      })
      .limit(limit);
  }

  /**
   * Delete user
   */
  async delete(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

export const userDbService = new UserDbService();
