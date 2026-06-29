import { useEffect, useRef, useState } from "react";

/**
 * Minimal, professional cursor.
 * - tiny solid dot tracks the pointer 1:1
 * - thin outline ring follows with subtle inertia
 * - ring gently scales up on interactive elements (no labels, no clutter)
 * - hidden on touch devices and respects reduced motion
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const isInteractive = (el: EventTarget | null) =>
      !!(el as HTMLElement | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHover(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[5px] w-[5px] rounded-full bg-foreground"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-foreground/40 transition-[width,height,border-color,background-color] duration-300 ease-out ${
          hover ? "h-10 w-10 border-ember/70 bg-ember/5" : "h-7 w-7"
        }`}
      />
    </>
  );
}
