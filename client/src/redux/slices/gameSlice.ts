import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GamePhase =
  | "waiting"
  | "countdown"
  | "choose-word"
  | "drawing"
  | "round-result"
  | "game-over";

interface GameState {
  phase: GamePhase;

  timer: number;

  countdown: number;

  currentDrawerId: string | null;

  currentWord: string;

  wordHint: string;

  wordChoices: string[];

  winnerId: string | null;
}

const initialState: GameState = {
  phase: "waiting",

  timer: 0,

  countdown: 3,

  currentDrawerId: null,

  currentWord: "",

  wordHint: "",

  wordChoices: [],

  winnerId: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<GamePhase>) => {
      state.phase = action.payload;
    },

    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },

    decrementTimer: (state) => {
      if (state.timer > 0) {
        state.timer--;
      }
    },

    setCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
    },

    decrementCountdown: (state) => {
      if (state.countdown > 0) {
        state.countdown--;
      }
    },

    resetCountdown: (state) => {
      state.countdown = 3;
    },

    setDrawer: (state, action: PayloadAction<string | null>) => {
      state.currentDrawerId = action.payload;
    },

    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord = action.payload;
    },

    setWordHint: (state, action: PayloadAction<string>) => {
      state.wordHint = action.payload;
    },

    setWordChoices: (state, action: PayloadAction<string[]>) => {
      state.wordChoices = action.payload;
    },

    clearWordChoices: (state) => {
      state.wordChoices = [];
    },

    setWinner: (state, action: PayloadAction<string | null>) => {
      state.winnerId = action.payload;
    },

    resetGame: () => initialState,
  },
});

export const {
  setPhase,
  setTimer,
  decrementTimer,
  setCountdown,
  decrementCountdown,
  resetCountdown,
  setDrawer,
  setCurrentWord,
  setWordHint,
  setWordChoices,
  clearWordChoices,
  setWinner,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
