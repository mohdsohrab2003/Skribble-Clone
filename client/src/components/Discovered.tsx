"use client";

import { Gamepad2, Globe, ShieldCheck, ChevronRight } from "lucide-react";

const items = [
  {
    title: "Game feedback platform",
    subtitle: "Share feedback and ideas",
    icon: Gamepad2,
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    title: "Browser Games",
    subtitle: "Play fun games instantly",
    icon: Globe,
    color: "bg-sky-500/20 text-sky-400",
  },
  {
    title: "Game moderation tools",
    subtitle: "Powerful moderation suite",
    icon: ShieldCheck,
    color: "bg-orange-500/20 text-orange-400",
  },
];

const Discovered = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-3">
      <h2 className="text-2xl font-bold">Discover more</h2>

      <div className="mt-1 h-1 w-14 rounded-full bg-primary" />

      <div className="mt-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center rounded-xl p-3 transition hover:bg-white/5"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="ml-2 flex-1 text-left">
                <h4 className="font-semibold">{item.title}</h4>

                <p className="text-sm text-gray-400">{item.subtitle}</p>
              </div>

              <ChevronRight size={20} className="text-gray-500" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Discovered;
