"use client";

import { useEffect, useState } from "react";
import { X, LogIn, Hash } from "lucide-react";
import { socket } from "@/lib/socket";

interface JoinRoomModalProps {
  open: boolean;
  onClose: () => void;
  onJoin?: (roomId: string) => void;
}

const JoinRoomModal = ({ open, onClose, onJoin }: JoinRoomModalProps) => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;
  // useEffect(() => {
  //   const handleRoomError = ({ message }: { message: string }) => {
  //     setError(message);
  //   };

  //   socket.on("room-error", handleRoomError);

  //   return () => {
  //     socket.off("room-error", handleRoomError);
  //   };
  // }, []);

  const handleJoin = () => {
    const id = roomId.trim().toUpperCase();

    if (!id) return;

    socket.emit("join-room", id);

    onJoin?.(id);

    setRoomId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
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
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-card">
            <LogIn size={24} className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text">Join Room</h2>

            <p className="text-sm text-text-muted">
              Enter the Room ID shared by your friend.
            </p>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-text-muted">
            <Hash size={16} />
            Room ID
          </label>

          <input
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value.toUpperCase());
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleJoin();
              }
            }}
            placeholder="e.g. 8F4K2Q"
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 uppercase text-text outline-none transition-all placeholder:text-text-muted focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3 font-medium text-text-muted transition hover:bg-surface-2 hover:text-text"
          >
            Cancel
          </button>

          <button
            onClick={handleJoin}
            disabled={!roomId.trim()}
            className="flex items-center gap-2 rounded-xl border border-sky-500 bg-sky-500/10 px-6 py-3 font-semibold text-sky-400 transition-all hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogIn size={18} />
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoomModal;
