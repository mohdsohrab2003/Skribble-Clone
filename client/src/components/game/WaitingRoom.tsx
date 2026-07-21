"use client";

import Image from "next/image";
import { Copy, Crown, Play, Users } from "lucide-react";

import { useAppSelector } from "@/redux/hooks";
import { useSocket } from "@/socket/SocketProvider";
import { getAvatarById } from "@/utils/avatar";

export default function WaitingRoom() {
  const socket = useSocket();

  const room = useAppSelector((state) => state.room);
  const me = useAppSelector((state) => state.player.me);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(room.code);
    } catch (error) {
      console.error(error);
    }
  };

  const startGame = () => {
    socket?.emit("game:start");
  };

  return (
    <div className="flex h-[90vh] items-center justify-center p-4">
      <div className="flex h-full max-h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
        {/* Header */}
        <div className="grid grid-cols-2 gap-4 border-b border-border p-5">
          <div>
            <p className="text-xs uppercase text-text-muted">Room ID</p>

            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-lg bg-primary/20 px-3 py-1 font-bold tracking-widest text-primary-light">
                {room.code || "------"}
              </span>

              <button
                onClick={copyRoomId}
                className="rounded-lg p-2 hover:bg-surface-2"
              >
                <Copy size={16} />
              </button>
            </div>

            <p className="mt-3 text-sm text-text-muted">
              {room.players.length}/{room.settings.maxPlayers} Players
            </p>
          </div>

          <div className="flex flex-col items-end justify-center">
            <Users className="mb-2 text-primary-light" size={28} />

            <h2 className="text-xl font-bold text-text">Waiting...</h2>

            <p className="text-sm text-text-muted">Invite your friends</p>
          </div>
        </div>

        {/* Players */}
        <div className="custom-scrollbar flex-1 overflow-y-auto p-5">
          <div className="space-y-3">
            {room.players.map((player) => {
              const avatar = getAvatarById(player.avatarId);

              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-2xl bg-surface-2 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12">
                      <Image
                        src={avatar.img}
                        alt={player.name}
                        fill
                        className="rounded-full object-contain"
                      />

                      {player.isHost && (
                        <Crown
                          size={18}
                          className="absolute -right-1 -top-1 fill-warning text-warning"
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-text">{player.name}</p>

                        {player.id === me?.id && (
                          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs text-primary-light">
                            YOU
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-text-muted">
                        {player.isHost ? "Host" : "Player"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`h-3 w-3 rounded-full ${
                      player.connected ? "bg-success" : "bg-danger"
                    }`}
                  />
                </div>
              );
            })}

            {Array.from({
              length: Math.max(
                0,
                room.settings.maxPlayers - room.players.length,
              ),
            }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-dashed border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2">
                    <Users size={20} className="text-text-muted" />
                  </div>

                  <span className="text-text-muted">Waiting for player...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {me?.isHost && (
          <div className="border-t border-border p-5">
            <button
              disabled={room.players.length < 2}
              onClick={startGame}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Play size={18} />
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
