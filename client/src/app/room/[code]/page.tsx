"use client";

import { useRouter } from "next/navigation";

import Chat from "@/components/game/Chat";
import CountdownOverlay from "@/components/game/CountdownOverlay";
import DrawingBoard from "@/components/game/DrawingBoard";
import GameOverModal from "@/components/game/GameOverModal";
import GameTopBar from "@/components/game/GameTopBar";
import Lobby from "@/components/game/Lobby";
import RoundResultModal from "@/components/game/RoundResultModal";
import WaitingRoom from "@/components/game/WaitingRoom";
import WordSelectionModal from "@/components/game/WordSelectionModal";

import { useAppSelector } from "@/redux/hooks";
import { useSocket } from "@/socket/SocketProvider";
import { useDispatch } from "react-redux";
import { resetRoom } from "@/redux/slices/roomSlice";
import { clearMe } from "@/redux/slices/playerSlice";
import { clearMessages } from "@/redux/slices/chatSlice";

export default function GamePage() {
  const router = useRouter();
  const socket = useSocket();
  const dispatch = useDispatch();

  const room = useAppSelector((state) => state.room);
  const game = useAppSelector((state) => state.game);
  const me = useAppSelector((state) => state.player.me);
  const chatMessages = useAppSelector((state) => state.chat.messages);

  const { phase, timer, countdown, wordChoices, wordHint, currentDrawerId } =
    game;

  const drawer =
    room.players.find((player) => player.id === currentDrawerId)?.name ?? "";

  const onSend = (message: string) => {
    socket?.emit("chat:message", {
      message,
    });
  };
  const isDrawer =
    room.players.find((p) => p.socketId === socket.id)?.id === currentDrawerId;

  const handleSelectWord = (word: string) => {
    console.log("Selecting word:", word);

    socket.emit("game:choose-word", {
      word,
    });
  };
  console.log("========== CLIENT ==========");
  console.log("Phase:", phase);
  console.log("Me:", me?.id);
  console.log("Current Drawer:", currentDrawerId);
  console.log("Is Drawer:", me?.id === currentDrawerId);
  console.log("Word Choices:", wordChoices);
  console.log("Room Status:", room.status);
  const Leave = () => {
    router.replace("/");

    setTimeout(() => {
      socket.emit("room:leave");
      socket.disconnect();

      dispatch(resetRoom());
      dispatch(clearMe());
      dispatch(clearMessages());
    }, 0);
  };

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto flex min-h-screen max-w-[90%] flex-col p-2 sm:p-4">
        {/* Waiting Room */}
        {room.status === "waiting" && <WaitingRoom />}

        {/* Word Selection */}
        <WordSelectionModal
          open={phase === "choose-word" && isDrawer}
          words={wordChoices}
          timeLeft={timer}
          onSelect={handleSelectWord}
        />

        {/* Countdown */}
        <CountdownOverlay open={phase === "countdown"} count={countdown} />

        {/* Round Result */}
        {/* <RoundResultModal
          open={phase === "round-result"}
          players={room.players}
          round={room.currentRound}
          totalRounds={room.settings.rounds}
          nextRoundIn={5}
        /> */}

        {/* Game Over */}
        <GameOverModal
          open={phase === "game-over"}
          players={room.players}
          onLeave={Leave}
          onPlayAgain={() => socket?.emit("game:restart")}
        />

        {/* Hide gameplay while waiting */}
        {phase !== "waiting" && (
          <>
            <GameTopBar
              round={room.currentRound}
              totalRounds={room.settings.rounds}
              timeLeft={timer}
              wordHint={wordHint}
              drawer={drawer}
            />

            <div className="mt-4 flex-1">
              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  lg:grid-cols-12
                  2xl:grid-cols-15
                "
              >
                {/* Lobby */}
                <aside className="lg:col-span-3 2xl:col-span-3">
                  <Lobby players={room.players} roomId={room.code} />
                </aside>

                {/* Drawing Board */}
                <section className="lg:col-span-6 2xl:col-span-9">
                  <DrawingBoard isDrawer={isDrawer} />
                </section>

                {/* Chat */}
                <aside className="lg:col-span-3 2xl:col-span-3">
                  <Chat messages={chatMessages} onSend={onSend} />
                </aside>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
