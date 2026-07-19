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
    <nav className="hidden items-center gap-10 md:flex">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "group relative flex items-center gap-2 font-medium transition",
              active ? "text-white" : "text-gray-400 hover:text-white",
            )}
          >
            <Icon size={18} />
            {item.label}

            <span
              className={clsx(
                "absolute -bottom-3 left-0 h-1 rounded-full bg-violet-500 transition-all duration-300",
                active ? "w-full" : "w-0 group-hover:w-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};
export default NavList;
