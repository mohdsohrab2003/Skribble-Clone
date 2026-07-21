import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "@/types/player";

export type RoomStatus = "waiting" | "starting" | "playing" | "finished";

export interface GameSettings {
  maxPlayers: number;
  rounds: number;
  drawTime: number;
  hints: number;
  wordChoices: number;
  wordMode: string;
  isPrivate: boolean;
}

export interface RoomState {
  id: string;
  code: string;

  status: RoomStatus;

  hostId: string;

  players: Player[];

  settings: GameSettings;

  currentRound: number;
  currentTurn: number;

  loading: boolean;
}

const initialState: RoomState = {
  id: "",
  code: "",

  status: "waiting",

  hostId: "",

  players: [],

  settings: {
    maxPlayers: 8,
    rounds: 3,
    drawTime: 80,
    hints: 2,
    wordChoices: 3,
    wordMode: "normal",
    isPrivate: false,
  },

  currentRound: 0,
  currentTurn: 0,

  loading: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (_, action: PayloadAction<RoomState>) => {
      return action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },

    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },

    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload,
      );
    },

    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.players.findIndex(
        (player) => player.id === action.payload.id,
      );

      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },

    setHost: (state, action: PayloadAction<string>) => {
      state.hostId = action.payload;
    },

    setStatus: (state, action: PayloadAction<RoomStatus>) => {
      state.status = action.payload;
    },

    setSettings: (state, action: PayloadAction<GameSettings>) => {
      state.settings = action.payload;
    },

    updateSettings: (state, action: PayloadAction<Partial<GameSettings>>) => {
      state.settings = {
        ...state.settings,
        ...action.payload,
      };
    },

    setRound: (state, action: PayloadAction<number>) => {
      state.currentRound = action.payload;
    },

    setTurn: (state, action: PayloadAction<number>) => {
      state.currentTurn = action.payload;
    },

    resetRoom: () => initialState,
  },
});

export const {
  setRoom,
  setLoading,
  setPlayers,
  addPlayer,
  removePlayer,
  updatePlayer,
  setHost,
  setStatus,
  setSettings,
  updateSettings,
  setRound,
  setTurn,
  resetRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
