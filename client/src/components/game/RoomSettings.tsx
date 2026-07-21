"use client";

import { useEffect, useState } from "react";
import {
  X,
  Users,
  Timer,
  Hash,
  Globe,
  Lock,
  Save,
  Trophy,
  BookOpen,
} from "lucide-react";
import { RangeSlider } from "../RangeSlider";

export interface RoomSettings {
  rounds: number;
  drawTime: number;
  maxPlayers: number;
  wordChoices: number;
  language: string;
  isPrivate: boolean;
}

interface RoomSettingsProps {
  open: boolean;
  settings: RoomSettings;
  onClose: () => void;
  onSave: (settings: RoomSettings) => void;
}

const LANGUAGES = ["English", "Hindi", "Spanish", "French", "German"];

export default function RoomSettings({
  open,
  settings,
  onClose,
  onSave,
}: RoomSettingsProps) {
  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  if (!open) return null;

  const update = <K extends keyof RoomSettings>(
    key: K,
    value: RoomSettings[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#171d33] shadow-2xl shadow-black/50">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={22} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <h2 className="mb-6 text-3xl font-bold text-white">Room Settings</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <RangeSlider
              icon={<Trophy size={18} />}
              label="Rounds"
              value={form.rounds}
              options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(v: number) => update("rounds", v)}
            />

            <RangeSlider
              icon={<Timer size={18} />}
              label="Draw Time"
              value={form.drawTime}
              options={[30, 45, 60, 80, 100, 120, 180]}
              suffix="s"
              onChange={(v: number) => update("drawTime", v)}
            />

            <RangeSlider
              icon={<Users size={18} />}
              label="Max Players"
              value={form.maxPlayers}
              options={[...Array(15)].map((_, i) => i + 2)}
              onChange={(v: number) => update("maxPlayers", v)}
            />

            <RangeSlider
              icon={<BookOpen size={18} />}
              label="Word Choices"
              value={form.wordChoices}
              options={[2, 3, 4, 5]}
              onChange={(v: number) => update("wordChoices", v)}
            />

            <RangeSlider
              icon={<Globe size={18} />}
              label="Language"
              value={form.language}
              options={LANGUAGES}
              onChange={(v: string) => update("language", v)}
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Lock size={18} />
                  Private Room
                </label>

                <span className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  {form.isPrivate ? "Private" : "Public"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-gray-800/60 px-4 py-4 shadow-lg backdrop-blur-sm">
                <span className="text-sm text-gray-300">
                  {form.isPrivate
                    ? "Only invited players can join"
                    : "Anyone with room code can join"}
                </span>

                <button
                  onClick={() => update("isPrivate", !form.isPrivate)}
                  className={`relative h-7 w-14 rounded-full transition ${
                    form.isPrivate ? "bg-emerald-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                      form.isPrivate ? "left-8" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-200 transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 px-6 py-3 font-semibold text-white transition hover:from-emerald-300 hover:to-emerald-500"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
