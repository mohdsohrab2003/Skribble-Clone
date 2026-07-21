// import { Avatar } from "@/utils/avatar";

// export interface Player {
//   id: string;
//   socketId: string;

//   name: string;
//   avatar: Avatar;

//   score: number;

//   drawing: boolean;
//   guessed: boolean;

//   host: boolean;
//   me?: boolean;

//   connected: boolean;
// }
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
  me?: boolean; // if you use player.me
}
export type PlayerStatus = "waiting" | "drawing" | "guessing" | "disconnected";

export interface PlayerSettings {
  sound: boolean;
  vibration: boolean;
}
