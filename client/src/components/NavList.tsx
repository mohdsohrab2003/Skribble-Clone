"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CircleHelp, Trophy } from "lucide-react";
import clsx from "clsx";

const NavList = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/how-to-play",
      label: "How to Play",
      icon: CircleHelp,
    },
    {
      href: "/leaderboards",
      label: "Leaderboards",
      icon: Trophy,
    },
  ];

  return (
    <nav className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
              "lg:px-0 lg:py-0 lg:rounded-none",
              active
                ? "bg-violet-500/15 text-white lg:bg-transparent"
                : "text-gray-400 hover:bg-white/5 hover:text-white lg:hover:bg-transparent",
            )}
          >
            <Icon size={18} />

            <span>{item.label}</span>

            {/* Desktop underline */}
            <span
              className={clsx(
                "absolute -bottom-2 left-0 hidden h-0.5 rounded-full bg-violet-500 transition-all duration-300 lg:block",
                active ? "w-full" : "w-0 group-hover:w-full",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default NavList;
