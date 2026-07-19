"use client";

import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dice5,
  Globe2,
  LogIn,
  Play,
  Plus,
  User,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextAvatar, previousAvatar } from "@/redux/slices/avatarSlice";
import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal";

interface Props {
  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const randomNames = [
  "SketchHero",
  "PixelKing",
  "DrawingMaster",
  "MagicBrush",
  "FunnyArtist",
  "FireFox",
];

const languages = ["English", "Hindi", "Spanish", "French", "German"];

const PlayerLobby = ({
  playerName,
  setPlayerName,
  language,
  setLanguage,
}: Props) => {
  const dispatch = useAppDispatch();
  const [openJoinRoom, setOpenJoinRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const selectedAvatar = useAppSelector((state) => state.avatar.selectedAvatar);

  const randomName = () => {
    const random = randomNames[Math.floor(Math.random() * randomNames.length)];

    setPlayerName(random);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-card p-5">
      {/* Top Form */}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {/* Name */}

        <div className="md:col-span-3 flex items-center rounded-xl border border-white/10 bg-surface px-4">
          <User className="mr-3 text-violet-400" size={20} />

          <input
            value={playerName}
            required
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="h-14 flex-1 bg-transparent outline-none"
          />

          <button onClick={randomName}>
            <Dice5 className="text-gray-400 hover:text-violet-400" />
          </button>
        </div>

        {/* Language */}

        <div>
          <div className="relative">
            <Globe2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
            />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-14 w-full appearance-none rounded-xl border border-white/10 bg-surface pl-12 pr-12 text-white outline-none transition-all duration-200 hover:border-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            >
              {languages.map((item) => (
                <option
                  key={item}
                  value={item}
                  className="bg-[#1e2130] text-white"
                >
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Avatar Preview */}

      <div className="relative mt-4 flex items-center justify-center">
        <button
          onClick={() => dispatch(previousAvatar())}
          className="absolute left-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-primary"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => dispatch(nextAvatar())}
          className="absolute right-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-primary"
        >
          <ChevronRight />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative h-35 w-35">
            <Image
              src={selectedAvatar.img}
              alt={selectedAvatar.name}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mt-1 text-xl font-semibold">
            Player Name : {playerName}
          </h3>
        </div>
      </div>

      {/* Play */}

      <button className="mt-5 flex h-12 w-2xl mx-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-3xl font-bold transition hover:scale-[1.02]">
        <Play fill="white" size={28} />
        Play!
      </button>

      <p className="mt-2 text-center text-gray-400">
        Find a public room and start playing
      </p>

      {/* Create Room */}
      <div className="mt-5 w-2xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Create Room */}
        <div>
          <button
            onClick={() => setOpenCreateRoom(true)}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-emerald-500 bg-emerald-500/10 text-lg font-semibold text-emerald-400 transition-all duration-200 hover:bg-emerald-500 hover:text-white"
          >
            <Plus size={20} />
            Create Private Room
          </button>

          <CreateRoomModal
            open={openCreateRoom}
            onClose={() => setOpenCreateRoom(false)}
            onCreate={(settings) => {
              console.log(settings);
              setOpenCreateRoom(false);
            }}
          />
        </div>

        {/* Join Room */}
        <div>
          <button
            onClick={() => setOpenJoinRoom(true)}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-sky-500 bg-sky-500/10 text-lg font-semibold text-sky-400 transition-all duration-200 hover:bg-sky-500 hover:text-white"
          >
            <LogIn size={20} />
            Join Room
          </button>
          <JoinRoomModal
            open={openJoinRoom}
            onClose={() => setOpenJoinRoom(false)}
            onJoin={(settings) => {
              console.log(settings);
              setOpenJoinRoom(false);
            }}
          />
        </div>
      </div>

      <p className="mt-3 text-center text-gray-400">
        Create a room and invite your friends.
      </p>
    </div>
  );
};
export default PlayerLobby;
