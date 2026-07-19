export interface Point {
  x: number;
  y: number;
}

export type Tool = "brush" | "eraser";

export interface Stroke {
  id: string;
  tool: Tool;
  color: string;
  size: number;
  points: Point[];
}

export interface CanvasState {
  tool: Tool;
  color: string;
  brushSize: number;
}
export interface UseCanvasOptions {
  color?: string;
  size?: number;
  tool?: Tool;
}
