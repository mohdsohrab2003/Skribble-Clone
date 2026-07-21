import { Schema, model, Document } from "mongoose";

export type RoomStatus =
  | "waiting"
  | "starting"
  | "choosing-word"
  | "drawing"
  | "round-end"
  | "finished";

export interface IRoomSettings {
  maxPlayers: number;
  rounds: number;
  drawTime: number;
  wordChoices: number;
  hints: number;
  wordMode: "Normal" | "Hidden" | "Combination";
  isPrivate: boolean;
}

export interface IRoom extends Document {
  roomCode: string;

  hostId: string;

  playerIds: string[];

  settings: IRoomSettings;

  status: RoomStatus;

  startedAt?: Date;

  endedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
  {
    roomCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    hostId: {
      type: String,
      required: true,
    },

    playerIds: [
      {
        type: String,
        default: [],
      },
    ],

    settings: {
      maxPlayers: {
        type: Number,
        default: 8,
      },

      rounds: {
        type: Number,
        default: 3,
      },

      drawTime: {
        type: Number,
        default: 80,
      },

      wordChoices: {
        type: Number,
        default: 3,
      },

      hints: {
        type: Number,
        default: 2,
      },

      wordMode: {
        type: String,
        enum: ["Normal", "Hidden", "Combination"],
        default: "Normal",
      },

      isPrivate: {
        type: Boolean,
        default: false,
      },
    },

    status: {
      type: String,
      enum: [
        "waiting",
        "starting",
        "choosing-word",
        "drawing",
        "round-end",
        "finished",
      ],
      default: "waiting",
    },

    startedAt: {
      type: Date,
    },

    endedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.index({ roomCode: 1 }, { unique: true });
roomSchema.index({ status: 1 });

export const RoomModel = model<IRoom>("Room", roomSchema);
