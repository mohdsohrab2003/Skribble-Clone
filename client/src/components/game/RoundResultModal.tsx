"use client";

import Image from "next/image";
import { Trophy, Star, Crown } from "lucide-react";
import { Player } from "@/utils/players";
import { getAvatarById } from "@/utils/avatar";

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
  const winner = ranked[0];
  const avatar = getAvatarById(winner.avatarId);

  const getPlace = (index: number) => {
    switch (index) {
      case 0:
        return "1st Place";
      case 1:
        return "2nd Place";
      case 2:
        return "3rd Place";
      default:
        return `${index + 1}th Place`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        {/* Header */}
        <div className="shrink-0 border-b border-border p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-warning bg-surface-2">
                <Image
                  src={avatar.img}
                  alt={winner.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Crown
                  size={30}
                  className="fill-warning text-warning drop-shadow-lg"
                />
              </div>
            </div>

            <Trophy className="mt-4 text-warning" size={46} />

            <h2 className="mt-3 text-3xl font-bold text-text">
              Round {round} Finished
            </h2>

            <p className="mt-1 text-lg font-semibold text-primary-light">
              🏆 {winner.name} is leading!
            </p>

            <p className="text-text-muted">
              Round {round} / {totalRounds}
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {ranked.map((player, index) => {
              const avatar = getAvatarById(player.avatarId);

              return (
                <div
                  key={player.id}
                  className={`flex items-center justify-between rounded-2xl p-3 transition-all ${
                    index === 0
                      ? "border border-warning bg-warning/10"
                      : index === 1
                        ? "border border-slate-400/40 bg-surface-2"
                        : index === 2
                          ? "border border-orange-500/40 bg-surface-2"
                          : "bg-surface-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <div className="flex w-8 justify-center">
                      {index === 0 ? (
                        <Crown
                          size={22}
                          className="fill-warning text-warning"
                        />
                      ) : (
                        <span className="font-bold text-warning">
                          #{index + 1}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-surface">
                      <Image
                        src={avatar.img}
                        alt={player.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Player */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text">
                          {player.name}
                        </h3>

                        {player.me && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary-light">
                            YOU
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-text-muted">
                        {getPlace(index)}
                      </p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 rounded-full bg-surface px-3 py-1">
                    <Star size={15} className="fill-warning text-warning" />
                    <span className="font-bold text-warning">
                      {player.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-5">
          <div className="text-center">
            <p className="text-lg font-bold text-primary-light">
              Next Round in {nextRoundIn}s
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{
                  width: `${Math.min((nextRoundIn / 10) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
