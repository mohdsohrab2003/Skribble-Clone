import { ChatMessage } from "./ChatMessage.js";
import { Player } from "./Player.js";
import { Stroke } from "./Stroke.js";

import { GameSettings, GameStatus } from "../types/game.js";

export interface Room {
  id: string;

  code: string;

  players: Player[];

  hostId: string;

  status: GameStatus;

  settings: GameSettings;

  currentRound: number;

  currentTurn: number;

  currentDrawer?: string;
  chooseWordTime: number;

  currentWord?: string;

  wordChoices: string[];

  timer: number;

  canvas: Stroke[];

  chat: ChatMessage[];

  createdAt: number;
}
