"use client";

import { Stroke } from "@/types/canvas";
import { useEffect, useRef, useState } from "react";
import { Tool } from "@/types/canvas";
import { socket } from "@/socket/socket";
export interface UseCanvasOptions {
  color?: string;
  size?: number;
  tool?: Tool;
  canDraw?: boolean;
  onStrokeComplete?: (stroke: Stroke) => void;
}

export const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  {
    color = "#000000",
    size = 5,
    tool = "brush",
    canDraw,
    onStrokeComplete,
  }: UseCanvasOptions,
) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const drawing = useRef(false);

  // const [brushColor, setBrushColor] = useState(color);
  // const [brushSize, setBrushSize] = useState(size);
  const strokes = useRef<Stroke[]>([]);
  const currentStroke = useRef<Stroke | null>(null);
  const redoStack = useRef<Stroke[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateHistoryState = () => {
    setCanUndo(strokes.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctxRef.current = ctx;
  }, [canvasRef, color, size]);

  const getPosition = (e: PointerEvent): { x: number; y: number } => {
    const rect = canvasRef.current!.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: PointerEvent) => {
    if (!canDraw) return;
    if (!ctxRef.current) return;

    drawing.current = true;

    const { x, y } = getPosition(e);

    currentStroke.current = {
      id: crypto.randomUUID(),
      tool,
      color,
      size: size,
      points: [{ x, y }],
    };

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e: PointerEvent) => {
    if (!canDraw) return;
    if (!drawing.current || !ctxRef.current || !currentStroke.current) return;

    const { x, y } = getPosition(e);

    currentStroke.current.points.push({ x, y });
    ctxRef.current.globalCompositeOperation =
      currentStroke.current.tool === "eraser"
        ? "destination-out"
        : "source-over";

    ctxRef.current.strokeStyle = currentStroke.current.color;
    ctxRef.current.lineWidth = currentStroke.current.size;

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!canDraw) return;
    if (!drawing.current || !currentStroke.current) return;

    drawing.current = false;

    const finishedStroke = currentStroke.current;

    strokes.current.push(finishedStroke);

    onStrokeComplete?.(finishedStroke);

    redoStack.current = [];

    currentStroke.current = null;

    ctxRef.current?.closePath();

    updateHistoryState();
  };
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokes.current.forEach((stroke) => {
      ctx.beginPath();

      ctx.globalCompositeOperation =
        stroke.tool === "eraser" ? "destination-out" : "source-over";

      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }

      ctx.stroke();
    });
  };

  const drawStroke = (stroke: Stroke) => {
    const ctx = ctxRef.current;

    if (!ctx || stroke.points.length === 0) return;

    ctx.beginPath();

    ctx.globalCompositeOperation =
      stroke.tool === "eraser" ? "destination-out" : "source-over";

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;

    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }

    ctx.stroke();
    ctx.closePath();
  };
  const drawRemoteStroke = (stroke: Stroke) => {
    strokes.current.push(stroke);

    drawStroke(stroke);

    updateHistoryState();
  };

  const undo = () => {
    const stroke = strokes.current.pop();

    if (!stroke) return;

    redoStack.current.push(stroke);

    redrawCanvas();
    updateHistoryState();
  };
  const redo = () => {
    const stroke = redoStack.current.pop();

    if (!stroke) return;

    strokes.current.push(stroke);

    redrawCanvas();
    updateHistoryState();
  };
  const clear = () => {
    strokes.current = [];
    redoStack.current = [];
    currentStroke.current = null;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateHistoryState();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointerleave", stopDrawing);

    return () => {
      canvas.removeEventListener("pointerdown", startDrawing);
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerup", stopDrawing);
      canvas.removeEventListener("pointerleave", stopDrawing);
    };
  });
  useEffect(() => {
    const handleClear = () => {
      clear();
    };

    socket.on("drawing:clear", handleClear);

    return () => {
      socket.off("drawing:clear", handleClear);
    };
  }, []);

  return {
    undo,
    redo,
    clear,
    drawRemoteStroke,
    canUndo,
    canRedo,
  };
};
