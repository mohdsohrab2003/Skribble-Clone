"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CountdownOverlayProps {
  open: boolean;
  count: number;
}

export default function CountdownOverlay({
  open,
  count,
}: CountdownOverlayProps) {
  const text = count === 0 ? "GO!" : count.toString();

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Outer Ring */}
          <motion.div
            className="absolute h-80 w-80 rounded-full border-4 border-white/10"
            animate={{
              scale: [1, 1.25],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute h-56 w-56 rounded-full border-4 border-warning/40"
            animate={{
              scale: [1, 1.15],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Countdown */}
          <motion.div
            key={text}
            initial={{
              scale: 0,
              opacity: 0,
              rotate: -20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            exit={{
              scale: 2,
              opacity: 0,
              rotate: 20,
            }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 220,
            }}
            className="relative"
          >
            {/* Glow */}
            <motion.div
              className={`absolute inset-0 blur-3xl ${
                count === 0 ? "bg-success/40" : "bg-warning/40"
              }`}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />

            <h1
              className={`relative text-center font-black tracking-tight drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] ${
                count === 0
                  ? "text-7xl text-success md:text-[9rem]"
                  : "text-8xl text-white md:text-[11rem]"
              }`}
            >
              {text}
            </h1>
          </motion.div>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-warning"
              style={{
                left: `${15 + i * 7}%`,
                top: `${30 + (i % 4) * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.4, 0.5],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
