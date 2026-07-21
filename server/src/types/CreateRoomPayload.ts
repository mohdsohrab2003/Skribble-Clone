// import { Avatar } from "../types/avatar";

import { GameSettings } from "./game.js";

export interface CreateRoomPayload {
  player: {
    name: string;
    avatarId: number;
  };

  settings: GameSettings;

  language: string;
}
