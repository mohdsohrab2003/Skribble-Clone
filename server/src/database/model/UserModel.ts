import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  avatar: string;

  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },

    avatar: {
      type: String,
      required: true,
    },

    gamesPlayed: {
      type: Number,
      default: 0,
    },

    gamesWon: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ username: 1 });

export const UserModel = model<IUser>("UserModel", userSchema);
