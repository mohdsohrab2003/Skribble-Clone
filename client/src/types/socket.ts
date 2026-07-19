import { Tool } from "./canvas";

export interface DrawEvent {
  roomId: string;
  x: number;
  y: number;
  color: string;
  size: number;
  tool: Tool;
  type: "start" | "draw" | "end";
}
