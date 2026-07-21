import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./slices/avatarSlice";
import canvasReducer from "./slices/canvasSlice";
import roomReducer from "./slices/roomSlice";
import playerReducer from "./slices/playerSlice";
import gameReducer from "./slices/gameSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    canvas: canvasReducer,
    room: roomReducer,
    player: playerReducer,
    game: gameReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
