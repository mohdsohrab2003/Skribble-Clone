import { Schema, model, Types, Document } from "mongoose";

export interface IChatMessage {
  sender?: Types.ObjectId;

  senderName: string;

  message: string;

  isSystem: boolean;

  isCorrectGuess: boolean;

  createdAt: Date;
}

export interface IChat extends Document {
  room: Types.ObjectId;

  roomCode: string;

  messages: IChatMessage[];

  createdAt: Date;

  updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    senderName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isSystem: {
      type: Boolean,
      default: false,
    },

    isCorrectGuess: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const chatSchema = new Schema<IChat>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    roomCode: {
      type: String,
      required: true,
    },

    messages: {
      type: [chatMessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

chatSchema.index({ roomCode: 1 });

export const ChatModel = model<IChat>("ChatModel", chatSchema);
