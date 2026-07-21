"use client";

import { useEffect } from "react";

import { useSocket } from "@/socket/SocketProvider";
import { useAppDispatch } from "@/redux/hooks";

import {
  setPhase,
  setDrawer,
  setCurrentWord,
  setWordHint,
  setWordChoices,
  clearWordChoices,
  setTimer,
  setCountdown,
} from "@/redux/slices/gameSlice";

import { setRoom } from "@/redux/slices/roomSlice";

export default function useGameSocket() {
  const socket = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    const onGameStarted = (room: any) => {
      dispatch(setRoom(room));

      dispatch(setDrawer(room.currentDrawer));

      dispatch(setTimer(room.settings.drawTime));

      dispatch(setCountdown(3));

      dispatch(setPhase("countdown"));
    };

    const onWordChoices = (words: string[]) => {
      dispatch(setWordChoices(words));

      dispatch(setPhase("choose-word"));
    };

    const onRoundStarted = (room: any) => {
      dispatch(setRoom(room));

      dispatch(setPhase("drawing"));

      dispatch(clearWordChoices());

      dispatch(setCurrentWord(room.currentWord));

      dispatch(setWordHint(room.currentWord.replace(/[A-Za-z]/g, "_ ")));

      dispatch(setTimer(room.timer));
    };

    const onRoundEnded = (room: any) => {
      dispatch(setRoom(room));

      dispatch(setPhase("round-result"));
    };
    const onCountdown = (count: number) => {
      dispatch(setCountdown(count));
    };

    socket.on("game:started", onGameStarted);

    socket.on("game:word-choices", onWordChoices);

    socket.on("game:round-started", onRoundStarted);

    socket.on("game:round-ended", onRoundEnded);
    socket.on("game:countdown", onCountdown);

    return () => {
      socket.off("game:started", onGameStarted);

      socket.off("game:word-choices", onWordChoices);

      socket.off("game:round-started", onRoundStarted);

      socket.off("game:round-ended", onRoundEnded);
      socket.off("game:countdown", onCountdown);
    };
  }, [socket, dispatch]);
}
