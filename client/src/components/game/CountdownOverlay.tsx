"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CountdownOverlayProps {
  open: boolean;
  count: number;
}

export default function CountdownOverlay({
  open,
  count,
}: CountdownOverlayProps) {
  if (!open) return null;

  const text = count === 0 ? "DRAW!" : count.toString();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key={text}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="select-none"
          >
            <h1
              className={`text-center font-black drop-shadow-lg ${
                count === 0
                  ? "text-7xl text-success md:text-9xl"
                  : "text-8xl text-white md:text-[10rem]"
              }`}
            >
              {text}
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
