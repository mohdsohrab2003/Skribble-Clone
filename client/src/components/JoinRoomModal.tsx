"use client";

import { useState } from "react";
import { X, LogIn, Hash } from "lucide-react";

interface JoinRoomModalProps {
  open: boolean;
  onClose: () => void;
  onJoin: (data: { roomCode: string }) => void;
}

export default function JoinRoomModal({
  open,
  onClose,
  onJoin,
}: JoinRoomModalProps) {
  const [roomCode, setRoomCode] = useState("");

  if (!open) return null;

  const handleJoin = () => {
    const code = roomCode.trim().toUpperCase();

    if (!code) return;

    onJoin({ roomCode: code });

    setRoomCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-surface/95 p-8 shadow-card backdrop-blur-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted transition hover:bg-red-500 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-card">
            <LogIn size={24} className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text">Join Room</h2>

            <p className="text-sm text-text-muted">
              Enter your friend's room code.
            </p>
          </div>
        </div>

        {/* Room Code */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-text-muted">
            <Hash size={16} />
            Room Code
          </label>

          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoin();
              }
            }}
            placeholder="e.g. ABC123"
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 uppercase outline-none focus:border-primary-light"
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3 font-medium text-text-muted hover:bg-surface-2"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            disabled={!roomCode.trim()}
            className="flex items-center gap-2 rounded-xl border border-sky-500 bg-sky-500/10 px-6 py-3 font-semibold text-sky-400 transition hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogIn size={18} />
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
