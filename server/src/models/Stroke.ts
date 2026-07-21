export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;

  color: string;

  size: number;

  tool: "brush" | "eraser";

  points: Point[];
}
