"use client";

import { Clock3, Pencil, Settings, Trophy } from "lucide-react";
import { useState } from "react";
import RoomSettings from "./RoomSettings";
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
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [settings, setSettings] = useState({
    rounds: 3,
    drawTime: 80,
    maxPlayers: 8,
    wordChoices: 3,
    language: "English",
    isPrivate: false,
  });

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

      {/* Setting */}
      <div
        onClick={() => setSettingsOpen(true)}
        className="flex cursor-pointer items-center gap-2"
      >
        <Settings size={25} className="text-emerald-500 text-lg font-bold" />
      </div>

      <RoomSettings
        open={settingsOpen}
        settings={settings}
        onClose={() => setSettingsOpen(false)}
        onSave={(newSettings) => {
          setSettings(newSettings);
          setSettingsOpen(false);
        }}
      />
    </div>
  );
};

export default GameTopBar;
