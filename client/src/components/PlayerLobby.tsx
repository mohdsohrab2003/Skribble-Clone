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
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useSocket } from "@/socket/SocketProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextAvatar, previousAvatar } from "@/redux/slices/avatarSlice";
import { setLanguage, setMe, setPlayerName } from "@/redux/slices/playerSlice";
import { RoomState, setRoom } from "@/redux/slices/roomSlice";

import CreateRoomModal, { RoomSettings } from "./CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal";
import { Player } from "@/types/player";

const randomNames = [
  "SketchHero",
  "PixelKing",
  "DrawingMaster",
  "MagicBrush",
  "FunnyArtist",
  "FireFox",
];

const languages = ["English", "Hindi", "Spanish", "French", "German"];

export default function PlayerLobby() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const room = useAppSelector((state) => state.room);

  const [openJoinRoom, setOpenJoinRoom] = useState(false);
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  const { playerName, language } = useAppSelector((state) => state.player);

  const selectedAvatar = useAppSelector((state) => state.avatar.selectedAvatar);

  const randomName = () => {
    dispatch(
      setPlayerName(
        randomNames[Math.floor(Math.random() * randomNames.length)],
      ),
    );
  };

  const validatePlayer = () => {
    if (!playerName.trim()) {
      alert("Please enter your name.");
      return false;
    }

    return true;
  };

  const publicSettings: RoomSettings = useMemo(
    () => ({
      roomName: "",
      maxPlayers: 8,
      rounds: 3,
      drawTime: 80,
      wordChoices: 3,
      hints: 2,
      wordMode: "Normal",
      isPrivate: false,
    }),
    [],
  );

  // Public Room
  const handlePlay = () => {
    if (!validatePlayer()) return;
    // console.log("ROOM CREATED EVENT", room);

    socket.emit("room:create", {
      name: playerName.trim(),
      avatarId: selectedAvatar.id,
      language,
      settings: publicSettings,
    });
  };

  // Private Room
  const handleCreateRoom = (settings: RoomSettings) => {
    if (!validatePlayer()) return;

    socket.emit("room:create", {
      name: playerName.trim(),
      avatarId: selectedAvatar.id,
      language,
      settings: {
        ...settings,
        isPrivate: true,
      },
    });
    // console.log("ROOM CREATED EVENT", room);

    setOpenCreateRoom(false);
  };

  // Join Room
  const handleJoinRoom = ({ roomCode }: { roomCode: string }) => {
    if (!validatePlayer()) return;

    socket.emit("room:join", {
      roomCode,
      name: playerName.trim(),
      avatarId: selectedAvatar.id,
      language,
    });

    setOpenJoinRoom(false);
  };

  // useEffect(() => {
  //   if (!socket) return;

  //   const handleRoomCreated = ({
  //     room,
  //     player,
  //   }: {
  //     room: RoomState;
  //     player: Player;
  //   }) => {
  //     dispatch(setRoom(room));
  //     dispatch(setMe(player));

  //     console.log("ROOM CREATED EVENT", room, player);

  //     router.push(`/room/${room.code}`);
  //   };
  //   const handleRoomJoined = ({
  //     room,
  //     player,
  //   }: {
  //     room: RoomState;
  //     player: Player;
  //   }) => {
  //     dispatch(setRoom(room));
  //     dispatch(setMe(player));

  //     router.push(`/room/${room.code}`);
  //   };

  //   socket.on("room:created", handleRoomCreated);
  //   socket.on("room:joined", handleRoomJoined);

  //   return () => {
  //     socket.off("room:created", handleRoomCreated);
  //     socket.off("room:joined", handleRoomJoined);
  //   };
  // }, [socket, dispatch, router]);
  useEffect(() => {
    if (room.code) {
      router.push(`/room/${room.code}`);
    }
  }, [room.code, router]);
  useEffect(() => {
    console.log("ROOM IN REDUX", room);
  }, [room]);

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-card p-5">
        {/* Name + Language */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
          <div className="md:col-span-3 flex items-center rounded-xl border border-white/10 bg-surface px-4">
            <User className="mr-3 text-violet-400" size={20} />

            <input
              value={playerName}
              onChange={(e) => dispatch(setPlayerName(e.target.value))}
              placeholder="Enter your name"
              className="h-14 flex-1 bg-transparent outline-none"
            />

            <button onClick={randomName}>
              <Dice5 className="text-gray-400 hover:text-violet-400" />
            </button>
          </div>

          <div className="relative">
            <Globe2
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
            />

            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="h-14 w-full appearance-none rounded-xl border border-white/10 bg-surface pl-12 pr-12 outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="relative mt-5 flex items-center justify-center">
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
            <div className="relative h-36 w-36">
              <Image
                src={selectedAvatar.img}
                alt={selectedAvatar.name}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="mt-2 text-xl font-semibold">
              {playerName || "Player"}
            </h3>
          </div>
        </div>

        {/* Public Play */}
        <button
          onClick={handlePlay}
          className="mx-auto mt-5 flex h-12 w-full max-w-2xl items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 text-2xl font-bold hover:scale-[1.02]"
        >
          <Play fill="white" size={26} />
          Play!
        </button>

        <p className="mt-2 text-center text-gray-400">
          Find a public room and start playing
        </p>

        {/* Private */}
        <div className="mx-auto mt-5 grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={() => setOpenCreateRoom(true)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-500 bg-emerald-500/10 font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-white"
          >
            <Plus size={20} />
            Create Room
          </button>

          <button
            onClick={() => setOpenJoinRoom(true)}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-sky-500 bg-sky-500/10 font-semibold text-sky-400 hover:bg-sky-500 hover:text-white"
          >
            <LogIn size={20} />
            Join Room
          </button>
        </div>

        <p className="mt-3 text-center text-gray-400">
          Create a room and invite your friends.
        </p>
      </div>

      <CreateRoomModal
        open={openCreateRoom}
        onClose={() => setOpenCreateRoom(false)}
        onCreate={handleCreateRoom}
      />
      <JoinRoomModal
        open={openJoinRoom}
        onClose={() => setOpenJoinRoom(false)}
        onJoin={handleJoinRoom}
      />
    </>
  );
}
