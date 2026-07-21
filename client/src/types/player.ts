import { Avatar } from "@/utils/avatar";

export interface Player {
  id: string;
  socketId: string;

  name: string;
  avatar: Avatar;

  score: number;

  drawing: boolean;
  guessed: boolean;

  host: boolean;
  me?: boolean;

  connected: boolean;
}
