"use client";

import { X, Users, Timer, Hash, Lightbulb, BookOpen } from "lucide-react";
import { useState } from "react";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (settings: RoomSettings) => void;
}

export interface RoomSettings {
  roomName: string;
  maxPlayers: number;
  rounds: number;
  drawTime: number;
  wordCount: number;
  hints: string;
  wordMode: "Normal" | "Hidden" | "Combination";
}

const CreateRoomModal = ({ open, onClose, onCreate }: CreateRoomModalProps) => {
  const [settings, setSettings] = useState<RoomSettings>({
    roomName: "",
    maxPlayers: 8,
    rounds: 3,
    drawTime: 80,
    wordCount: 3,
    hints: "2",
    wordMode: "Normal",
  });

  if (!open) return null;

  const update = (key: keyof RoomSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#171d33] shadow-2xl shadow-black/50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Scrollable content, no visible scrollbar */}
        <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
            Create Private Room
          </h2>

          <div className="grid gap-5">
            {/* Room Name */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <RangeSlider
                icon={<Users size={18} />}
                label="Max Players"
                value={settings.maxPlayers}
                onChange={(v) => update("maxPlayers", v)}
                options={[...Array(19)].map((_, i) => i + 2)}
              />

              <RangeSlider
                icon={<Hash size={18} />}
                label="Rounds"
                value={settings.rounds}
                onChange={(v) => update("rounds", v)}
                options={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />

              <RangeSlider
                icon={<Timer size={18} />}
                label="Draw Time"
                value={settings.drawTime}
                onChange={(v) => update("drawTime", v)}
                options={[15, 30, 45, 60, 80, 90, 120, 180, 240]}
                suffix="s"
              />

              <RangeSlider
                icon={<BookOpen size={18} />}
                label="Word Count"
                value={settings.wordCount}
                onChange={(v) => update("wordCount", v)}
                options={[1, 2, 3, 4, 5]}
              />

              <RangeSlider
                icon={<Lightbulb size={18} />}
                label="Hints"
                value={settings.hints}
                onChange={(v) => update("hints", String(v))}
                options={["Disabled", 0, 1, 2, 3, 4, 5]}
              />

              <RangeSlider
                icon={<BookOpen size={18} />}
                label="Word Mode"
                value={settings.wordMode}
                onChange={(v) => update("wordMode", v)}
                options={["Normal", "Hidden", "Combination"]}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-200 shadow-md shadow-black/20 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              onClick={() => onCreate?.(settings)}
              className="rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:from-emerald-400 hover:to-emerald-500 hover:shadow-emerald-500/30 active:scale-[0.98]"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function RangeSlider({
  label,
  icon,
  value,
  options,
  onChange,
  suffix = "",
}: any) {
  const index = Math.max(
    0,
    options.findIndex((o: any) => String(o) === String(value)),
  );
  const percent = options.length > 1 ? (index / (options.length - 1)) * 100 : 0;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
          {icon}
          {label}
        </label>
        <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
          {options[index]}
          {suffix}
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gray-800/60 px-4 py-3 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-gray-800/80">
        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          value={index}
          onChange={(e) => onChange(options[Number(e.target.value)])}
          style={{
            background: `linear-gradient(to right, #34d399 ${percent}%, rgba(255,255,255,0.1) ${percent}%)`,
          }}
          className="modal-range h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none"
        />
      </div>

      <style>{`
        .modal-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: linear-gradient(to bottom right, #6ee7b7, #10b981);
          border: 3px solid #171d33;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .modal-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .modal-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: linear-gradient(to bottom right, #6ee7b7, #10b981);
          border: 3px solid #171d33;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .modal-range::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
        .modal-range::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

export default CreateRoomModal;
