import { PlayerStatus } from "../types/player.js";

export interface Player {
  id: string;
  socketId: string;

  name: string;
  avatarId: number;

  score: number;

  isHost: boolean;
  hasGuessed: boolean;

  status: PlayerStatus;

  connected: boolean;

  reconnectToken: string;

  joinedAt: number;
}
