import { Socket } from "socket.io";

import { RoomEmitter } from "../emitters/room.js";
import { leaveRoom } from "../helpers/leaveRoom.js";

export function registerLeaveRoom(socket: Socket, emitter: RoomEmitter) {
  socket.on("room:leave", () => {
    leaveRoom(socket, emitter);
  });
}
