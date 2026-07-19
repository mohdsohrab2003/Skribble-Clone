"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../utils/assets/logo.png";
import { Moon, Globe, ChevronDown } from "lucide-react";
import NavList from "./NavList";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f1630]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-[90vw] items-center justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* Replace with your logo */}
          <Image
            src={logo}
            alt="Skribble"
            width={200}
            height={60}
            priority
            className="w-44 h-auto"
          />
        </Link>

        {/* Navigation */}

        <NavList />

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
            <Moon size={20} />
          </button>

          <button className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10">
            <Globe size={18} />
            <span>English</span>
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
