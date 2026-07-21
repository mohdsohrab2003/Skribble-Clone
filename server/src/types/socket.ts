import { Socket } from "socket.io";

export interface SocketData {
  roomId?: string;
  playerId?: string;
}

export type GameSocket = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  SocketData
>;
