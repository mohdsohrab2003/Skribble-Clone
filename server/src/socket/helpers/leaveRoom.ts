import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { RoomEmitter } from "../emitters/room.js";
import { roomDbService } from "../../database/dbservices/RoomDbService.js";

export async function leaveRoom(socket: Socket, emitter: RoomEmitter) {
  const room = roomService.getRoomBySocket(socket.id);

  if (!room) return;

  const player = room.players.find((player) => player.socketId === socket.id);

  if (!player) return;

  const updatedRoom = roomService.leaveRoom(room.code, player.id);
  if (room) {
    await roomDbService.update(room.code, {
      playerIds: room.players.map((p) => p.id),
      hostId: room.hostId,
    });
  } else {
    await roomDbService.delete(room);
  }

  socket.leave(room.code);

  if (!updatedRoom) {
    return;
  }

  emitter.playerLeft(updatedRoom);
}
