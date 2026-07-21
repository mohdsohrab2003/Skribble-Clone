"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";

import { socket } from "./socket";

import { useAppDispatch } from "@/redux/hooks";

import { setRoom, resetRoom } from "@/redux/slices/roomSlice";

import { setMe, clearMe } from "@/redux/slices/playerSlice";

import {
  addMessage,
  clearMessages,
  setMessages,
} from "@/redux/slices/chatSlice";

import {
  setPhase,
  setCountdown,
  setDrawer,
  setTimer,
  setWordChoices,
  setWordHint,
  setWinner,
} from "@/redux/slices/gameSlice";
import { ChatMessage } from "@/types/chat";

const SocketContext = createContext(socket);

export function SocketProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    // ==========================
    // ROOM
    // ==========================
    socket.on("room:created", ({ room, player }) => {
      console.log("ROOM CREATED:", { room, player });

      dispatch(setRoom(room));

      if (player) {
        dispatch(setMe(player));
      } else {
        console.error("player is undefined");
      }

      dispatch(setPhase("waiting"));
    });

    socket.on("room:joined", ({ room, player }) => {
      console.log("ROOM JOINED:", { room, player });

      dispatch(setRoom(room));

      if (player) {
        dispatch(setMe(player));
      } else {
        console.error("player is undefined");
      }

      dispatch(setPhase("waiting"));
    });

    socket.on("room:updated", (room) => {
      dispatch(setRoom(room));
    });

    socket.on("player:joined", (room) => {
      dispatch(setRoom(room));
    });

    socket.on("player:left", (room) => {
      dispatch(setRoom(room));
    });

    socket.on("room:settings", (room) => {
      dispatch(setRoom(room));
    });

    // ==========================
    // GAME
    // ==========================

    socket.on("game:started", (room) => {
      dispatch(setRoom(room));
      dispatch(setPhase("countdown"));
    });

    socket.on("game:countdown", (count: number) => {
      dispatch(setCountdown(count));
    });

    socket.on("game:word-choices", ({ drawerId, words }) => {
      console.log("Received word choices", drawerId, words);

      dispatch(setDrawer(drawerId));
      dispatch(setWordChoices(words));
      dispatch(setPhase("choose-word"));
    });

    socket.on("game:round-started", (room) => {
      dispatch(setRoom(room));
      dispatch(setDrawer(room.currentDrawer));
      dispatch(setTimer(room.timer));
      dispatch(setWordHint(room.wordHint));
      dispatch(setPhase("drawing"));
    });

    socket.on("game:timer", (time: number) => {
      console.log("GAME TIMER:", time);
      dispatch(setTimer(time));
    });

    socket.on("game:round-ended", (room) => {
      dispatch(setRoom(room));
      dispatch(setPhase("round-result"));
    });

    socket.on("game:finished", (room) => {
      dispatch(setRoom(room));

      if (room.players.length) {
        dispatch(setWinner(room.players[0].id));
      }

      dispatch(setPhase("game-over"));
    });

    // ==========================
    // CHAT
    // ==========================

    socket.on("chat:history", (messages: ChatMessage[]) => {
      dispatch(setMessages(messages));
    });

    socket.on("chat:new", (message: ChatMessage) => {
      console.log("CHAT RECEIVED", message);
      dispatch(addMessage(message));
    });

    // ==========================
    // DISCONNECT
    // ==========================

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect", () => {
      console.log("Connected");
    });

    return () => {
      socket.off("room:created");
      socket.off("room:joined");
      socket.off("room:updated");
      socket.off("player:joined");
      socket.off("player:left");
      socket.off("room:settings");

      socket.off("game:started");
      socket.off("game:countdown");
      socket.off("game:word-choices");
      socket.off("game:round-started");
      socket.off("game:timer");
      socket.off("game:round-ended");
      socket.off("game:finished");

      socket.off("chat:new");

      socket.off("connect");
      socket.off("disconnect");

      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
