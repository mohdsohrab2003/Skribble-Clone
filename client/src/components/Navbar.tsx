"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../utils/assets/logo.png";
import { Moon, Globe, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import NavList from "./NavList";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f1630]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[90vw] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={logo}
            alt="Skribble"
            priority
            className="h-auto w-32 sm:w-40 md:w-44"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavList />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme */}
          <button className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
            <Moon size={18} />
          </button>

          {/* Language */}
          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10 sm:px-4">
            <Globe size={18} />

            <span className="hidden md:block">English</span>

            <ChevronDown size={16} className="hidden md:block" />
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 bg-[#0f1630] lg:hidden">
          <div className="py-4">
            <NavList />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
