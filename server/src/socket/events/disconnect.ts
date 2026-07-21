import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { playerService } from "../../services/player.service.js";

import { timerManager } from "../../managers/TimerManager.js";

import { RoomEmitter } from "../emitters/room.js";

export function registerDisconnect(socket: Socket, emitter: RoomEmitter) {
  socket.on("disconnect", () => {
    const room = roomService.getRoomBySocket(socket.id);

    if (!room) return;

    const player = playerService.markDisconnected(room.players, socket.id);

    if (!player) return;

    // Notify clients that player is temporarily disconnected
    emitter.roomUpdated(room);

    timerManager.create(
      `${room.code}:reconnect:${player.id}`,
      () => {
        const updatedRoom = roomService.leaveRoom(room.code, player.id);

        if (!updatedRoom) return;

        emitter.playerLeft(updatedRoom);
      },
      30000,
    );
  });
}
