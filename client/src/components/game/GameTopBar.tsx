"use client";

import { Clock3, Pencil, Trophy } from "lucide-react";

interface GameTopBarProps {
  round: number;
  totalRounds: number;
  timeLeft: number;
  wordHint: string;
  drawer: string;
}

const GameTopBar = ({
  round,
  totalRounds,
  timeLeft,
  wordHint,
  drawer,
}: GameTopBarProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-surface px-6 py-1 shadow-card">
      {/* Round */}
      <div className="flex items-center gap-2">
        <Trophy size={20} className="text-warning" />

        <div>
          {/* <p className="text-xs text-text-muted">Round</p> */}

          <p className="font-semibold text-text">
            {round}/{totalRounds}
          </p>
        </div>
      </div>

      {/* Word */}
      <div className="text-center">
        {/* <p className="text-xs text-text-muted">Guess the word</p> */}

        <h2 className="text-2xl font-bold tracking-[10px] text-text">
          {wordHint}
        </h2>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Clock3 size={20} className="text-danger" />

        <div>
          {/* <p className="text-xs text-text-muted">Time</p> */}
          <p className="text-lg font-bold text-danger">{timeLeft}s</p>
        </div>
      </div>

      {/* Drawer */}
      <div className="flex items-center gap-2">
        <Pencil size={20} className="text-primary-light" />

        <div>
          {/* <p className="text-xs text-text-muted">Drawing</p> */}

          <p className="font-semibold text-text">{drawer}</p>
        </div>
      </div>
    </div>
  );
};

export default GameTopBar;
