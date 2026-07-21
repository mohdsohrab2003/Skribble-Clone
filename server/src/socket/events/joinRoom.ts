import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { RoomEmitter } from "../emitters/room.js";
import { roomDbService } from "../../database/dbservices/RoomDbService.js";

interface JoinRoomPayload {
  roomCode: string;
  name: string;
  avatarId: number;
  language: string;
}

export function registerJoinRoom(socket: Socket, emitter: RoomEmitter) {
  socket.on("room:join", async (payload: JoinRoomPayload) => {
    try {
      console.log("room:join payload:", payload);

      if (!payload?.roomCode?.trim()) {
        emitter.error(socket, "Room code is required");
        return;
      }

      if (!payload?.name?.trim()) {
        emitter.error(socket, "Player name is required");
        return;
      }

      const room = roomService.joinRoom(
        payload.roomCode.trim().toUpperCase(),
        socket.id,
        payload.name.trim(),
        payload.avatarId,
        payload.language,
      );

      await roomDbService.update(room.code, {
        playerIds: room.players.map((p) => p.id),
      });

      socket.join(room.code);

      // Find the player who just joined
      const player = room.players.find((p) => p.socketId === socket.id);

      console.log("JOIN SOCKET ID:", socket.id);
      console.log("ROOM PLAYERS:", room.players);
      console.log("FOUND JOIN PLAYER:", player);

      socket.emit("room:joined", {
        room,
        player,
      });

      emitter.playerJoined(room);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  });
}
