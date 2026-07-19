"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Copy, Crown, Pencil, Trophy, Users } from "lucide-react";

import { Player } from "@/utils/players";

interface LobbyProps {
  players: Player[];
  roomId: string;
  maxPlayers?: number;
}

const rankColor: Record<number, string> = {
  1: "bg-yellow-500",
  2: "bg-slate-400",
  3: "bg-amber-700",
};

const rankBackground: Record<number, string> = {
  1: "bg-green-500/10 border-green-500/20",
  2: "bg-violet-500/10 border-violet-500/20",
  3: "bg-orange-500/10 border-orange-500/20",
};

export default function Lobby({ players, roomId, maxPlayers = 8 }: LobbyProps) {
  const rankedPlayers = useMemo(() => {
    return [...players]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
  }, [players]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
    } catch (err) {
      console.error(err);
    }
  };

  const copyRoomLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="flex h-[78vh] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-2">
        <div>
          <h2 className="text-lg font-bold text-text">Players</h2>

          <p className="text-xs text-text-muted">
            {players.length} of {maxPlayers} Players
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
          <Users size={20} className="text-primary-light" />
        </div>
      </div>

      {/* Players */}
      <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-1">
        {rankedPlayers.length === 0 ? (
          <div className="flex h-full items-center justify-center text-text-muted">
            Waiting for players...
          </div>
        ) : (
          rankedPlayers.map((player) => (
            <div
              key={player.id}
              className={`group flex items-center gap-2 rounded-2xl border p-2 transition-all duration-200 hover:border-primary hover:bg-surface-2 ${
                rankBackground[player.rank] ?? "border-transparent"
              }`}
            >
              {/* Rank */}
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                  rankColor[player.rank] ?? "bg-surface-2 text-text"
                }`}
              >
                {player.rank}
              </div>

              {/* Avatar */}
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                <Image
                  src={player.avatar.img}
                  alt={player.name}
                  fill
                  sizes="40px"
                  className="object-contain"
                />

                {/* Online Status */}
              </div>

              {/* Player Info */}
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="truncate text-sm font-semibold text-text">
                      {player.name}
                    </h3>

                    {player.me && (
                      <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-light">
                        You
                      </span>
                    )}

                    {player.host && (
                      <Crown
                        size={13}
                        className="shrink-0 fill-yellow-400 text-yellow-400"
                      />
                    )}

                    {player.drawing && (
                      <Pencil size={13} className="shrink-0 text-orange-400" />
                    )}

                    {player.guessed && (
                      <span className="rounded bg-success/20 px-1 py-0.5 text-[10px] font-bold text-success">
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className="flex shrink-0 items-center gap-1">
                  <Trophy size={13} className="text-warning" />

                  <span className="text-xs font-bold text-text">
                    {player.score.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="space-y-3 border-t border-border p-2">
        <button
          onClick={copyRoomLink}
          className="group flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface-2 transition-all hover:border-primary hover:bg-primary hover:text-white"
        >
          <Copy
            size={18}
            className="transition-transform group-hover:scale-110"
          />
          Copy Room Link
        </button>

        <div className="flex items-center justify-between text-sm m-2">
          <span className="text-text-muted">Room ID</span>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-primary-light">{roomId}</span>

            <button
              onClick={copyRoomId}
              className="rounded-md p-1 transition hover:bg-surface-2"
            >
              <Copy
                size={16}
                className="text-text-muted hover:text-primary-light"
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl bg-surface-2 py-2 px-4">
          <Trophy size={40} className="text-warning" />

          <span className="text-center text-sm font-medium text-text-muted">
            Highest score after the final round wins!
          </span>
        </div>
      </div>
    </aside>
  );
}
