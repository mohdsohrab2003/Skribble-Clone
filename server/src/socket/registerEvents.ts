import { Server, Socket } from "socket.io";

import { registerCreateRoom } from "./events/createRoom.js";
import { registerJoinRoom } from "./events/joinRoom.js";
import { registerLeaveRoom } from "./events/leaveRoom.js";
import { registerDisconnect } from "./events/disconnect.js";
import { registerReconnect } from "./events/reconnect.js";
import { registerGame } from "./events/game.js";
import { registerDrawing } from "./events/drawing.js";
import { registerChat } from "./events/chat.js";

import { RoomEmitter } from "./emitters/room.js";
import { GameEmitter } from "./emitters/game.js";
import { DrawingEmitter } from "./emitters/drawing.js";
import { ChatEmitter } from "./emitters/chat.js";

export function registerEvents(io: Server, socket: Socket) {
  const roomEmitter = new RoomEmitter(io);
  const gameEmitter = new GameEmitter(io);
  const drawingEmitter = new DrawingEmitter(io);
  const chatEmitter = new ChatEmitter(io);

  registerCreateRoom(socket, roomEmitter);

  registerJoinRoom(socket, roomEmitter);

  registerLeaveRoom(socket, roomEmitter);

  registerDisconnect(socket, roomEmitter);

  registerReconnect(socket, roomEmitter);

  registerGame(socket, gameEmitter);

  registerDrawing(socket, drawingEmitter);

  registerChat(socket, chatEmitter, gameEmitter);
}
