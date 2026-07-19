"use client";

import { useEffect, useState } from "react";

import Chat from "@/components/game/Chat";
import DrawingBoard from "@/components/game/DrawingBoard";
import GameTopBar from "@/components/game/GameTopBar";
import Lobby from "@/components/game/Lobby";
import WordSelectionModal from "@/components/game/WordSelectionModal";

import { ChatMessage } from "@/types/chat";
import { messages } from "@/utils/chat";
import { players } from "@/utils/players";
import RoundResultModal from "@/components/game/RoundResultModal";
import CountdownOverlay from "@/components/game/CountdownOverlay";

export default function GamePage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(messages);
  const [open, setOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [countdownOpen, setCountdownOpen] = useState(false);
  const [count, setCount] = useState(3);
  const onSend = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    if (!countdownOpen) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(timer);

          setTimeout(() => {
            setCountdownOpen(false);
            setCount(3);
          }, 800);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownOpen]);

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto flex min-h-screen max-w-[90%] flex-col p-2 sm:p-4">
        {/* Top Bar */}
        <GameTopBar
          round={1}
          totalRounds={3}
          timeLeft={80}
          wordHint="_ A _ _ _"
          drawer="CookieCat"
        />

        {/* Word Selection */}
        <WordSelectionModal
          open={open}
          timeLeft={20}
          words={["Apple", "Rocket", "Castle"]}
          onSelect={(word) => {
            console.log(word);
            setOpen(false);
          }}
        />
        <RoundResultModal
          open={showResult}
          players={players}
          round={1}
          totalRounds={3}
          nextRoundIn={5}
        />
        <CountdownOverlay open={countdownOpen} count={count} />

        {/* Main Layout */}
        <div className="mt-4 flex-1 ">
          <div
            className="grid   gap-4
                          grid-cols-1
                          lg:grid-cols-12
                          2xl:grid-cols-15"
          >
            {/* Lobby */}
            <aside className=" lg:col-span-3 2xl:col-span-3">
              <Lobby players={players} roomId="ABCD12" />
            </aside>

            {/* Canvas */}
            <section className="lg:col-span-6 2xl:col-span-9">
              <DrawingBoard />
            </section>

            {/* Chat */}
            <aside className=" lg:col-span-3 2xl:col-span-3">
              <Chat messages={chatMessages} onSend={onSend} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
