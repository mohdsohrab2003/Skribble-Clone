import { Socket } from "socket.io";

import { roomService } from "../../services/room.service.js";
import { drawingService } from "../../services/drawing.service.js";

import { DrawingEmitter } from "../emitters/drawing.js";

import { Stroke } from "../../models/Stroke.js";

export function registerDrawing(socket: Socket, emitter: DrawingEmitter) {
  socket.on("drawing:draw", (stroke: Stroke) => {
    try {
      console.log("drawing:draw received", socket.id);
      const room = roomService.getRoomBySocket(socket.id);

      if (!room) {
        return emitter.error(socket, "Room not found");
      }

      const player = room.players.find((p) => p.socketId === socket.id);

      if (!player) {
        return emitter.error(socket, "Player not found");
      }

      console.log("========== DRAW DEBUG ==========");
      console.log("Current Drawer:", room.currentDrawer);
      console.log("Player ID:", player.id);
      console.log("Socket ID:", socket.id);

      if (room.currentDrawer !== player.id) {
        console.log("❌ Not the drawer");
        return;
      }

      console.log("✅ Drawer can draw");

      drawingService.addStroke(room.code, stroke);

      emitter.draw(room.code, stroke);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  });

  socket.on("drawing:undo", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);

      if (!room) {
        return emitter.error(socket, "Room not found");
      }

      const player = room.players.find((p) => p.socketId === socket.id);

      if (!player || room.currentDrawer !== player.id) {
        return;
      }

      drawingService.undo(room.code);

      emitter.undo(room.code);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  });
  socket.on("drawing:clear", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);

      if (!room) {
        return emitter.error(socket, "Room not found");
      }

      const player = room.players.find((p) => p.socketId === socket.id);

      if (!player || room.currentDrawer !== player.id) {
        return;
      }

      drawingService.clear(room.code);

      emitter.clear(room.code);
    } catch (error) {
      emitter.error(
        socket,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  });
}
