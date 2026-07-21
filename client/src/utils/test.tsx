"use client";

import { useEffect } from "react";
import { useSocket } from "@/socket/SocketProvider";

export default function Test() {
  const socket = useSocket();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  return <div>Socket Test</div>;
}
