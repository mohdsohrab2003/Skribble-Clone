"use client";

import { Tool } from "@/types/canvas";

interface CursorPreviewProps {
  x: number;
  y: number;
  visible: boolean;
  size: number;
  color: string;
  tool: Tool;
}

const CursorPreview = ({
  x,
  y,
  visible,
  size,
  color,
  tool,
}: CursorPreviewProps) => {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-50 transition-all duration-75 ease-out"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
    >
      {tool === "brush" ? (
        <div
          className="h-full w-full rounded-full"
          style={{
            border: `2px solid ${color}`,
            backgroundColor: `${color}20`,
          }}
        />
      ) : (
        <div className="relative h-full w-full rounded-full border-2 border-dashed border-red-500">
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
        </div>
      )}
    </div>
  );
};

export default CursorPreview;
