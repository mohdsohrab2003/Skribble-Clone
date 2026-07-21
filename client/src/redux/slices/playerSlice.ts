import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "@/types/player";

interface PlayerState {
  // Current player in room
  me: Player | null;

  // Before joining a room
  playerName: string;
  language: string;
}

const initialState: PlayerState = {
  me: null,

  playerName: "",
  language: "English",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Room Player
    setMe: (state, action: PayloadAction<Player>) => {
      state.me = action.payload;
    },

    updateMe: (state, action: PayloadAction<Partial<Player>>) => {
      if (!state.me) return;

      state.me = {
        ...state.me,
        ...action.payload,
      };
    },

    updateScore: (state, action: PayloadAction<number>) => {
      if (!state.me) return;

      state.me.score = action.payload;
    },

    setConnected: (state, action: PayloadAction<boolean>) => {
      if (!state.me) return;

      state.me.connected = action.payload;
    },

    clearMe: (state) => {
      state.me = null;
    },

    // Lobby
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },

    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    resetLobby: (state) => {
      state.playerName = "";
      state.language = "English";
    },
  },
});

export const {
  setMe,
  updateMe,
  updateScore,
  setConnected,
  clearMe,
  setPlayerName,
  setLanguage,
  resetLobby,
} = playerSlice.actions;

export default playerSlice.reducer;
