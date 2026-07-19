import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./slices/avatarSlice";
import canvasReducer from "./slices/canvasSlice";

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    canvas: canvasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
