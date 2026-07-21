"use client";

import { useState } from "react";

import Avatars from "./Avatars";
import PlayerLobby from "./PlayerLobby";

const HeroSection = () => {
  return (
    <div className="space-y-6">
      <Avatars />

      <PlayerLobby />
    </div>
  );
};

export default HeroSection;
