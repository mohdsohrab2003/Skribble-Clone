import { ChatModel } from "../model/ChatModel.js";

interface ChatMessageData {
  senderId?: string;
  senderName: string;
  message: string;
  isSystem?: boolean;
  isCorrectGuess?: boolean;
  createdAt: Date;
}

interface CreateChatData {
  roomCode: string;
  messages: ChatMessageData[];
}

class ChatDbService {
  /**
   * Save complete chat
   */
  async create(data: CreateChatData) {
    return ChatModel.create(data);
  }

  /**
   * Find chat by room code
   */
  async findByRoomCode(roomCode: string) {
    return ChatModel.findOne({ roomCode });
  }

  /**
   * Add a message
   */
  async addMessage(roomCode: string, message: ChatMessageData) {
    return ChatModel.findOneAndUpdate(
      { roomCode },
      {
        $push: {
          messages: message,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }

  /**
   * Replace all messages
   */
  async update(roomCode: string, messages: ChatMessageData[]) {
    return ChatModel.findOneAndUpdate(
      { roomCode },
      {
        messages,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  /**
   * Delete chat
   */
  async delete(roomCode: string) {
    return ChatModel.deleteOne({ roomCode });
  }
}

export const chatDbService = new ChatDbService();
