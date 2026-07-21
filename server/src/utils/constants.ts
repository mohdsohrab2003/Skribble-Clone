import { GameSettings } from "../types/game.js";

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  rounds: 3,
  drawTime: 80,
  maxPlayers: 8,
  wordChoices: 3,
  isPrivate: false,
  chooseWordTime: 20,
  language: "English",
};

export const SCORE = {
  GUESS: 100,
  DRAWER: 25,
};

export const MIN_PLAYERS = 2;

export const MAX_PLAYERS = 16;

export const ROOM_CODE_LENGTH = 6;

export const MAX_CHAT_LENGTH = 120;

export const MAX_NAME_LENGTH = 20;

export const MIN_NAME_LENGTH = 3;
export const MIN_CHOOSEWORDTIME = 20;
