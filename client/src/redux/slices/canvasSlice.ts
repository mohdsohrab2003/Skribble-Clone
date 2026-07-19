import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tool } from "@/types/canvas";

interface CanvasState {
  tool: Tool;
  color: string;
  brushSize: number;
}

const initialState: CanvasState = {
  tool: "brush",
  color: "#000000",
  brushSize: 6,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },

    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },

    setBrushSize: (state, action: PayloadAction<number>) => {
      state.brushSize = action.payload;
    },
  },
});

export const { setTool, setColor, setBrushSize } = canvasSlice.actions;

export default canvasSlice.reducer;
