import { Socket } from "socket.io";
import { roomService } from "../../services/room.service.js";
import { RoomEmitter } from "../emitters/room.js";
import { roomDbService } from "../../database/dbservices/RoomDbService.js";
import { GameSettings } from "../../types/game.js";

interface CreateRoomPayload {
  name: string;
  avatarId: number;
  language: string;
  settings: GameSettings;
}

export function registerCreateRoom(socket: Socket, emitter: RoomEmitter) {
  socket.on("room:create", async (payload: CreateRoomPayload) => {
    try {
      console.log("room:create payload:", payload);

      if (!payload?.name?.trim()) {
        socket.emit("room:error", {
          message: "Player name is required",
        });
        return;
      }

      if (!payload.settings) {
        socket.emit("room:error", {
          message: "Room settings are required",
        });
        return;
      }

      const room = roomService.createRoom(
        socket.id,
        payload.name.trim(),
        payload.avatarId,
        payload.settings,
        payload.language,
      );

      await roomDbService.create({
        roomCode: room.code,
        hostId: room.hostId,
        playerIds: room.players.map((player) => player.id),
        settings: room.settings,
        status: room.status,
      });

      socket.join(room.code);

      // Find the player who created the room
      const player = room.players.find((p) => p.socketId === socket.id);

      console.log("SOCKET ID:", socket.id);
      console.log("ROOM PLAYERS:", room.players);
      console.log("FOUND PLAYER:", player);

      socket.emit("room:created", {
        room,
        player,
      });
    } catch (error) {
      console.error("Create Room Error:", error);

      socket.emit("room:error", {
        message: "Failed to create room.",
      });
    }
  });
}
