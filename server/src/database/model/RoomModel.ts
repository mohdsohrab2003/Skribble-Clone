import { Schema, model, Document, Types } from "mongoose";

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

  playerIds: Types.ObjectId[];

  settings: IRoomSettings;

  status: "waiting" | "playing" | "finished";

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

    startedAt: Date,

    endedAt: Date,
  },
  {
    timestamps: true,
  },
);

roomSchema.index({ roomCode: 1 });
roomSchema.index({ status: 1 });

export const RoomModel = model<IRoom>("RoomModel", roomSchema);
