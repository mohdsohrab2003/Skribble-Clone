"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface CanvasProps {
  className?: string;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (
    {
      className = "flex h-[78vh] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card",
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resizeCanvas = () => {
        const parent = canvas.parentElement;
        if (!parent) return;

        const width = parent.clientWidth;
        const height = width * (9 / 16); // 16:9

        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
      };

      resizeCanvas();

      const observer = new ResizeObserver(resizeCanvas);

      observer.observe(canvas.parentElement!);

      return () => observer.disconnect();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={`block  h-[76vh]  flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card w-full touch-none select-none rounded-2xl bg-white shadow-lg ${className}`}
      />
    );
  },
);

Canvas.displayName = "Canvas";

export default Canvas;
