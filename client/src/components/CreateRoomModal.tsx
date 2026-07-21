"use client";

import { useState } from "react";
import { X, Users, Timer, Hash, Lightbulb, BookOpen } from "lucide-react";

import { RangeSlider } from "./RangeSlider";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (settings: RoomSettings) => void;
}

export interface RoomSettings {
  roomName: string;
  maxPlayers: number;
  rounds: number;
  drawTime: number;
  wordChoices: number;
  hints: number;
  wordMode: "Normal" | "Hidden" | "Combination";
  isPrivate: boolean;
}

export default function CreateRoomModal({
  open,
  onClose,
  onCreate,
}: CreateRoomModalProps) {
  const [settings, setSettings] = useState<RoomSettings>({
    roomName: "",
    maxPlayers: 8,
    rounds: 3,
    drawTime: 80,
    wordChoices: 3,
    hints: 2,
    wordMode: "Normal",
    isPrivate: true,
  });

  const update = <K extends keyof RoomSettings>(
    key: K,
    value: RoomSettings[K],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#171d33] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
        >
          <X size={22} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-8">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Create Private Room
          </h2>

          <div className="grid gap-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <RangeSlider
                icon={<Users size={18} />}
                label="Max Players"
                value={settings.maxPlayers}
                onChange={(v) => update("maxPlayers", Number(v))}
                options={[...Array(19)].map((_, i) => i + 2)}
              />

              <RangeSlider
                icon={<Hash size={18} />}
                label="Rounds"
                value={settings.rounds}
                onChange={(v) => update("rounds", Number(v))}
                options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />

              <RangeSlider
                icon={<Timer size={18} />}
                label="Draw Time"
                value={settings.drawTime}
                onChange={(v) => update("drawTime", Number(v))}
                options={[15, 30, 45, 60, 80, 90, 120, 180, 240]}
                suffix="s"
              />

              <RangeSlider
                icon={<BookOpen size={18} />}
                label="Word Choices"
                value={settings.wordChoices}
                onChange={(v) => update("wordChoices", Number(v))}
                options={[1, 2, 3, 4, 5]}
              />

              <RangeSlider
                icon={<Lightbulb size={18} />}
                label="Hints"
                value={settings.hints}
                onChange={(v) => update("hints", Number(v))}
                options={[0, 1, 2, 3, 4, 5]}
              />

              <RangeSlider
                icon={<BookOpen size={18} />}
                label="Word Mode"
                value={settings.wordMode}
                onChange={(v) =>
                  update("wordMode", v as "Normal" | "Hidden" | "Combination")
                }
                options={["Normal", "Hidden", "Combination"]}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-6 py-3 text-gray-200 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              onClick={() => onCreate(settings)}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
