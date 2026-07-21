export type PlayerStatus = "waiting" | "drawing" | "guessing" | "disconnected";

export interface PlayerSettings {
  sound: boolean;
  vibration: boolean;
}
