"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Point = { x: number; y: number };

const TRAIL_LENGTH = 40;
const MOUSE_LERP = 0.12;
const SEGMENT_LERP = 0.2;

const DARK_GREEN: [number, number, number][] = [
  [45, 75, 16],
  [59, 97, 20],
  [78, 128, 25],
  [107, 165, 40],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CursorTrail() {
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef<Point>({ x: -200, y: -200 });
  const head = useRef<Point>({ x: -200, y: -200 });
  const trail = useRef<Point[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const rafId = useRef(0);
  const active = useRef(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    if (isTouchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      active.current = true;
    };

    const onLeave = () => {
      active.current = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      head.current.x = lerp(head.current.x, target.current.x, MOUSE_LERP);
      head.current.y = lerp(head.current.y, target.current.y, MOUSE_LERP);

      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trail.current[i].x = lerp(
          trail.current[i].x,
          trail.current[i - 1].x,
          SEGMENT_LERP
        );
        trail.current[i].y = lerp(
          trail.current[i].y,
          trail.current[i - 1].y,
          SEGMENT_LERP
        );
      }
      trail.current[0].x = lerp(trail.current[0].x, head.current.x, 0.4);
      trail.current[0].y = lerp(trail.current[0].y, head.current.y, 0.4);

      if (active.current) {
        for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
          const p = trail.current[i];
          const t = 1 - i / TRAIL_LENGTH;
          const [r, g, b] = DARK_GREEN[i % DARK_GREEN.length];
          const alpha = 0.04 + t * 0.3;
          const radius = 4 + t * 18;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
          grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
          grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.45})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        const headGrad = ctx.createRadialGradient(
          head.current.x,
          head.current.y,
          0,
          head.current.x,
          head.current.y,
          10
        );
        headGrad.addColorStop(0, "rgba(59, 97, 20, 0.5)");
        headGrad.addColorStop(0.5, "rgba(78, 128, 25, 0.22)");
        headGrad.addColorStop(1, "rgba(59, 97, 20, 0)");
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(head.current.x, head.current.y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [ready]);

  if (!ready) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2147483647,
      }}
    />,
    document.body
  );
}
