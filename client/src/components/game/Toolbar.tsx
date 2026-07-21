"use client";
import {
  Brush,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Palette,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrushSize, setColor, setTool } from "@/redux/slices/canvasSlice";

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

const COLORS = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export default function Toolbar({ undo, redo, clear }: ToolbarProps) {
  const dispatch = useAppDispatch();
  const { tool, color, brushSize } = useAppSelector((state) => state.canvas);

  return (
    <div className="mt-2 rounded-2xl border border-border bg-surface p-2 shadow-card sm:p-2">
      <div className="flex flex-col flex-wrap items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        {/* Tools */}
        <div className="flex items-center justify-center gap-2 rounded-xl bg-surface-2 p-1.5 sm:p-2">
          <button
            onClick={() => dispatch(setTool("brush"))}
            aria-label="Brush"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition sm:h-11 sm:w-11 ${
              tool === "brush"
                ? "bg-primary text-white"
                : "text-text hover:bg-primary/20"
            }`}
          >
            <Brush size={20} />
          </button>
          <button
            onClick={() => dispatch(setTool("eraser"))}
            aria-label="Eraser"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition sm:h-11 sm:w-11 ${
              tool === "eraser"
                ? "bg-primary text-white"
                : "text-text hover:bg-primary/20"
            }`}
          >
            <Eraser size={20} />
          </button>
        </div>

        {/* Colors — scrolls horizontally on small screens instead of wrapping */}
        <div className="flex min-w-0 items-center gap-2 overflow-x-auto rounded-xl bg-surface-2 p-1.5 sm:flex-wrap sm:justify-center sm:overflow-visible sm:p-2">
          <Palette size={18} className="shrink-0 text-text-muted" />
          <div className="flex shrink-0 items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => dispatch(setColor(c))}
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
                className={`h-7 w-7 shrink-0 rounded-full border-2 transition-all sm:h-8 sm:w-8 ${
                  color === c
                    ? "scale-110 border-white"
                    : "border-transparent hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Brush Size */}
        <div className="flex w-full items-center gap-3 rounded-xl bg-surface-2 p-2 sm:min-w-50 sm:flex-1">
          <span className="w-10 shrink-0 text-center text-sm font-semibold text-text">
            {brushSize}px
          </span>
          <input
            type="range"
            min={2}
            max={40}
            value={brushSize}
            onChange={(e) => dispatch(setBrushSize(Number(e.target.value)))}
            className="w-full flex-1 accent-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-2 rounded-xl bg-surface-2 p-1.5 sm:p-2">
          <button
            onClick={undo}
            aria-label="Undo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-primary hover:text-white sm:h-11 sm:w-11"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={redo}
            aria-label="Redo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-primary hover:text-white sm:h-11 sm:w-11"
          >
            <RotateCw size={18} />
          </button>
          <button
            onClick={clear}
            aria-label="Clear canvas"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-500 hover:text-white sm:h-11 sm:w-11"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
// export default Toolbar;
