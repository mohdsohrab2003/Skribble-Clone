"use client";

import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import { useCanvas } from "@/hooks/useCanvas";
import Toolbar from "./Toolbar";
import { useAppSelector } from "@/redux/hooks";
import { Stroke } from "@/types/canvas";
import CursorPreview from "./CursorPreview";
import { useSocket } from "@/socket/SocketProvider";

interface DrawingBoardPorps {
  isDrawer: boolean;
}

const DrawingBoard = ({ isDrawer }: DrawingBoardPorps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socket = useSocket();

  const { color, brushSize, tool } = useAppSelector((state) => state.canvas);
  const currentDrawerId = useAppSelector((state) => state.game.currentDrawerId);
  const me = useAppSelector((state) => state.player.me);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const canDraw = me?.id === currentDrawerId;

  const { undo, redo, clear, drawRemoteStroke } = useCanvas(canvasRef, {
    color,
    size: brushSize,
    tool,
    canDraw,
    onStrokeComplete: (stroke) => {
      console.log("Stroke completed", stroke);

      socket.emit("drawing:draw", stroke);

      console.log("drawing:draw emitted");
    },
  });
  useEffect(() => {
    const handleDraw = (stroke: Stroke) => {
      // Don't redraw our own stroke
      if (canDraw) return;

      drawRemoteStroke(stroke);
    };

    socket.on("drawing:draw", handleDraw);

    return () => {
      socket.off("drawing:draw", handleDraw);
    };
  }, [socket, drawRemoteStroke, canDraw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);

    const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);

    setCursor({
      x,
      y,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({
      ...prev,
      visible: false,
    }));
  };
  return (
    <div className="flex  flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
      <div>
        <div
          className="relative mx-auto w-full max-w-5xl cursor-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CursorPreview
            x={cursor.x}
            y={cursor.y}
            visible={cursor.visible}
            size={brushSize}
            color={color}
            tool={tool}
          />

          <Canvas ref={canvasRef} />
        </div>
        {/* <Canvas ref={canvasRef} width={870} height={460} /> */}
        {/* Toolbar */}
        {isDrawer && (
          <div className="mx-auto mt-1 w-full max-w-5xl">
            <Toolbar undo={undo} redo={redo} clear={clear} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingBoard;
