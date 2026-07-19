"use client";

import { useRef, useState } from "react";
import Canvas from "./Canvas";
import { useCanvas } from "@/hooks/useCanvas";
import Toolbar from "./Toolbar";
import { useAppSelector } from "@/redux/hooks";
import { Stroke } from "@/types/canvas";
import CursorPreview from "./CursorPreview";

const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { color, brushSize, tool } = useAppSelector((state) => state.canvas);
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
  });

  const { undo, redo, clear } = useCanvas(canvasRef, {
    color,
    size: brushSize,
    tool,
  });
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
        <div className="mx-auto mt-1 w-full max-w-5xl">
          <Toolbar undo={undo} redo={redo} clear={clear} />
        </div>
      </div>
    </div>
  );
};

export default DrawingBoard;
