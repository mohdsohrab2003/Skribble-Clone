"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { avatars } from "@/utils/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  nextAvatar,
  previousAvatar,
  setSelectedAvatar,
} from "@/redux/slices/avatarSlice";

const VISIBLE_COUNT = 10;
const ITEM_SIZE = 64;
const GAP = 12;

const Avatars = () => {
  const dispatch = useAppDispatch();

  const selectedAvatar = useAppSelector((state) => state.avatar.selectedAvatar);

  const sliderRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const currentIndex = avatars.findIndex(
    (avatar) => avatar.id === selectedAvatar.id,
  );

  const containerWidth = VISIBLE_COUNT * ITEM_SIZE + (VISIBLE_COUNT - 1) * GAP;

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const itemWidth = ITEM_SIZE + GAP;

    slider.scrollTo({
      left: Math.max(0, index * itemWidth - slider.clientWidth / 2 + itemWidth),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const mouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;

    if (!slider) return;

    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = slider.scrollLeft;
  };

  const mouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;

    const slider = sliderRef.current;

    if (!slider) return;

    e.preventDefault();

    const walk = (e.pageX - startX.current) * 1.5;

    slider.scrollLeft = scrollLeft.current - walk;
  };

  const mouseUp = () => {
    isDown.current = false;
  };

  const touchStart = (e: React.TouchEvent) => {
    const slider = sliderRef.current;

    if (!slider) return;

    startX.current = e.touches[0].pageX;
    scrollLeft.current = slider.scrollLeft;
  };

  const touchMove = (e: React.TouchEvent) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const walk = (e.touches[0].pageX - startX.current) * 1.5;

    slider.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(previousAvatar())}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 hover:bg-primary"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={sliderRef}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseLeave={mouseUp}
          onMouseUp={mouseUp}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          className="avatar-scroll flex gap-4 overflow-x-auto"
          style={{
            width: containerWidth,
          }}
        >
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => dispatch(setSelectedAvatar(avatar))}
              className="shrink-0"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
                  avatar.id === selectedAvatar.id
                    ? "scale-110 border-primary ring-2 ring-primary"
                    : "border-white/10 hover:border-primary"
                }`}
              >
                <Image
                  src={avatar.img}
                  alt={avatar.name}
                  width={48}
                  height={48}
                  draggable={false}
                  className="h-12 w-12 object-contain"
                />
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => dispatch(nextAvatar())}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 hover:bg-primary"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Avatars;
