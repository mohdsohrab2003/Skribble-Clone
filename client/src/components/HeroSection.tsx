"use client";

import { useState } from "react";

import Avatars from "./Avatars";
import PlayerLobby from "./PlayerLobby";

const HeroSection = () => {
  const [playerName, setPlayerName] = useState("");

  const [language, setLanguage] = useState("English");

  return (
    <div className="space-y-6">
      <Avatars />

      <PlayerLobby
        playerName={playerName}
        setPlayerName={setPlayerName}
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  );
};

export default HeroSection;
