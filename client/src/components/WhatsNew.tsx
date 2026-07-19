"use client";

import { Gift, Palette, Zap, ChevronRight } from "lucide-react";

const news = [
  {
    title: "New avatar items!",
    subtitle: "Check out the latest additions",
    badge: "New",
    icon: Gift,
    color: "bg-green-500/20 text-green-400",
  },
  {
    title: "Improved drawing tools",
    subtitle: "More colors and better UI",
    icon: Palette,
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    title: "Performance boost",
    subtitle: "Faster, smoother gameplay",
    icon: Zap,
    color: "bg-yellow-500/20 text-yellow-400",
  },
];

const WhatsNew = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-3">
      <h2 className="text-2xl font-bold">What's new</h2>

      <div className="mt-1 h-1 w-14 rounded-full bg-primary" />

      <div className="mt-1 space-y-1">
        {news.map((item) => {
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

              <div className="ml-4 flex-1 text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{item.title}</h4>

                  {item.badge && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>

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
export default WhatsNew;
