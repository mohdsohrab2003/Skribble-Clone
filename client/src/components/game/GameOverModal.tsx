"use client";

import Image from "next/image";
import { Trophy, RotateCcw, Home, Crown } from "lucide-react";

import { Player } from "@/utils/players";
import { getAvatarById } from "@/utils/avatar";

interface GameOverModalProps {
  open: boolean;
  players: Player[];
  onPlayAgain: () => void;
  onLeave: () => void;
}

export default function GameOverModal({
  open,
  players,
  onPlayAgain,
  onLeave,
}: GameOverModalProps) {
  if (!open || players.length === 0) {
    return null;
  }

  const rankedPlayers = [...players].sort((a, b) => b.score - a.score);

  const winner = rankedPlayers[0];
  const avatar = getAvatarById(winner.avatarId);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        {/* Winner */}
        <div className="shrink-0 p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-warning bg-surface-2">
                <Image
                  src={avatar.img}
                  alt={winner.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Crown size={34} className="fill-warning text-warning" />
              </div>
            </div>

            <Trophy className="mt-5 text-warning" size={55} />

            <h2 className="mt-4 text-4xl font-bold text-text">Game Finished</h2>

            <p className="mt-2 text-xl font-semibold text-primary-light">
              {winner.name} Wins!
            </p>

            <p className="text-text-muted">
              Final Score • {winner.score.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Scrollable Leaderboard */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-6">
          <div className="space-y-3 pb-2">
            {rankedPlayers.map((player, index) => {
              const avatar = getAvatarById(player.avatarId);
              return (
                <div
                  key={player.id}
                  className={`flex items-center justify-between rounded-2xl p-3 ${
                    index === 0
                      ? "border border-warning bg-warning/10"
                      : "bg-surface-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center font-bold text-warning">
                      #{index + 1}
                    </span>

                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-surface">
                      <Image
                        src={avatar.img}
                        alt={player.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-text">{player.name}</h3>

                      {player.me && (
                        <span className="text-xs text-primary-light">YOU</span>
                      )}
                    </div>
                  </div>

                  <div className="font-bold text-warning">
                    {player.score.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="shrink-0 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onPlayAgain}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-semibold text-white transition hover:bg-primary-light"
            >
              <RotateCcw size={18} />
              Play Again
            </button>

            <button
              onClick={onLeave}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface-2 py-3 font-semibold text-text transition hover:border-primary"
            >
              <Home size={18} />
              Leave Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
