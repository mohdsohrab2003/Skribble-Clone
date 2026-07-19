"use client";

import { Trophy, Star } from "lucide-react";
import { Player } from "@/utils/players";

interface RoundResultModalProps {
  open: boolean;
  players: Player[];
  round: number;
  totalRounds: number;
  nextRoundIn: number;
}

export default function RoundResultModal({
  open,
  players,
  round,
  totalRounds,
  nextRoundIn,
}: RoundResultModalProps) {
  if (!open) return null;

  const ranked = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-card">
        <div className="mb-6 text-center">
          <Trophy className="mx-auto mb-3 text-warning" size={50} />

          <h2 className="text-3xl font-bold text-text">
            Round {round} Finished
          </h2>

          <p className="text-text-muted">
            {round} / {totalRounds}
          </p>
        </div>

        <div className="space-y-2">
          {ranked.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between rounded-xl bg-surface-2 p-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-warning">#{index + 1}</span>

                <span className="font-semibold text-text">{player.name}</span>

                {player.me && (
                  <span className="rounded bg-primary/20 px-2 py-1 text-xs text-primary-light">
                    YOU
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Star size={15} className="text-warning" />
                <span className="font-bold text-text">{player.score}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-lg font-semibold text-primary-light">
          Next Round in {nextRoundIn}s
        </div>
      </div>
    </div>
  );
}
