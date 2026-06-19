'use client';

import { useEffect, useRef } from 'react';

export default function AppBackground() {
  const glowRef   = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow   = glowRef.current;
    const cursor = cursorRef.current;
    if (!glow || !cursor) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      glow.style.transform   = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      cursor.style.opacity   = '1';
    };
    const onLeave = () => { cursor.style.opacity = '0'; };

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="app-bg" aria-hidden="true">
        <div className="app-bg-grid" />
        <div className="app-bg-orb app-bg-orb-2" />
        <div className="app-bg-scanline" />
        <div className="app-bg-glow" ref={glowRef} />
      </div>
      <div className="app-cursor" ref={cursorRef} aria-hidden="true" />
    </>
  );
}
