"use client";

import { useState, useEffect } from "react";

export default function Particles({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = [
      "hsl(173, 80%, 50%)",
      "hsl(340, 75%, 55%)",
      "hsl(48, 96%, 53%)",
      "hsl(210, 20%, 95%)",
      "hsl(280, 65%, 60%)",
    ];

    const newParticles = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * 360;
      const distance = 60 + Math.random() * 80;
      const rad = (angle * Math.PI) / 180;
      return {
        id: Date.now() + i,
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        duration: 0.4 + Math.random() * 0.4,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 800);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `particle-fly ${p.duration}s ease-out forwards`,
            transform: `translate(${p.x}px, ${p.y}px)`,
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
          }}
        />
      ))}
    </div>
  );
}
