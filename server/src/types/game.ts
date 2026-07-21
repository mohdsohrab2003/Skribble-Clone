export type GameStatus =
  | "waiting"
  | "starting"
  | "choosing-word"
  | "drawing"
  | "round-end"
  | "finished";

export interface GameSettings {
  rounds: number;
  drawTime: number;
  maxPlayers: number;
  wordChoices: number;
  chooseWordTime: number;
  isPrivate: boolean;
  language: string;
}
