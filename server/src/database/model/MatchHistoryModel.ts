import { Schema, model, Types, Document } from "mongoose";

export interface IPlayerResult {
  user: Types.ObjectId;

  username: string;

  avatar: string;

  score: number;

  rank: number;
}

export interface IMatchHistory extends Document {
  room: Types.ObjectId;

  roomCode: string;

  winner: Types.ObjectId;

  players: IPlayerResult[];

  rounds: number;

  duration: number;

  createdAt: Date;

  updatedAt: Date;
}

const playerResultSchema = new Schema<IPlayerResult>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    rank: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const matchHistorySchema = new Schema<IMatchHistory>(
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

    winner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    players: {
      type: [playerResultSchema],
      required: true,
    },

    rounds: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

matchHistorySchema.index({ roomCode: 1 });
matchHistorySchema.index({ winner: 1 });

export const MatchHistoryModel = model<IMatchHistory>(
  "MatchHistoryModel",
  matchHistorySchema,
);
