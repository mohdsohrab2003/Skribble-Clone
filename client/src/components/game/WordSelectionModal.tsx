"use client";

import { Pencil } from "lucide-react";

interface WordSelectionModalProps {
  open: boolean;
  words: string[];
  timeLeft: number;
  onSelect: (word: string) => void;
}

export default function WordSelectionModal({
  open,
  words,
  timeLeft,
  onSelect,
}: WordSelectionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-card">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <Pencil className="text-primary-light" size={30} />
          </div>

          <h2 className="text-2xl font-bold text-text">Choose a Word</h2>

          <p className="mt-2 text-center text-text-muted">
            Pick one word to draw for everyone.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {words.map((word) => (
            <button
              key={word}
              onClick={() => onSelect(word)}
              className="w-full rounded-2xl border border-border bg-surface-2 px-5 py-4 text-lg font-semibold text-text transition hover:border-primary hover:bg-primary hover:text-white"
            >
              {word}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <span className="rounded-xl bg-surface-2 px-4 py-2 text-sm font-medium text-text-muted">
            Time Left: {timeLeft}s
          </span>
        </div>
      </div>
    </div>
  );
}
