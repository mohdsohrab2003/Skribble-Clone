import { ReactNode } from "react";

interface RangeSliderProps<T extends string | number> {
  label: string;
  icon?: ReactNode;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  suffix?: string;
  disabled?: boolean;
  className?: string;
}

export function RangeSlider<T extends string | number>({
  label,
  icon,
  value,
  options,
  onChange,
  suffix = "",
}: RangeSliderProps<T>) {
  const index = Math.max(
    0,
    options.findIndex((o) => String(o) === String(value)),
  );

  const percent = options.length > 1 ? (index / (options.length - 1)) * 100 : 0;

  return (
    <div className="w-full">
      {/* Label */}
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

      {/* Slider Card */}
      <div className="rounded-2xl border border-white/10 bg-gray-800/60 px-4 py-4 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-gray-800/80">
        <input
          type="range"
          min={0}
          max={options.length - 1}
          step={1}
          value={index}
          onChange={(e) => onChange(options[Number(e.target.value)])}
          style={{
            background: `linear-gradient(to right, #34d399 ${percent}%, rgba(255,255,255,0.08) ${percent}%)`,
          }}
          className="game-slider h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        />

        {/* Min / Max */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>{options[0]}</span>
          <span>{options[options.length - 1]}</span>
        </div>
      </div>

      <style jsx>{`
        .game-slider {
          border-radius: 9999px;
        }

        .game-slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 9999px;
          background: transparent;
        }

        .game-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -5px;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #6ee7b7, #10b981);
          border: 3px solid #171d33;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .game-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.2);
        }

        .game-slider::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
          background: transparent;
        }

        .game-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          border: 3px solid #171d33;
          background: linear-gradient(135deg, #6ee7b7, #10b981);
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .game-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
