import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { playerService } from "../../services/player.service.js";

import { timerManager } from "../../managers/TimerManager.js";

import { RoomEmitter } from "../emitters/room.js";

interface ReconnectPayload {
  reconnectToken: string;
}

export function registerReconnect(socket: Socket, emitter: RoomEmitter) {
  socket.on("player:reconnect", ({ reconnectToken }: ReconnectPayload) => {
    try {
      const room = roomService.getRoomByReconnectToken(reconnectToken);

      if (!room) {
        return emitter.error(socket, "Reconnect failed.");
      }

      const player = playerService.reconnectPlayer(
        room.players,
        reconnectToken,
        socket.id,
      );

      if (!player) {
        return emitter.error(socket, "Reconnect failed.");
      }

      timerManager.clear(`${room.code}:reconnect:${player.id}`);

      socket.join(room.code);

      emitter.roomUpdated(room);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown Error",
      );
    }
  });
}
