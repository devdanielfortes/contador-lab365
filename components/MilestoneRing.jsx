"use client";

import { useState, useEffect } from "react";

export default function MilestoneRing({ trigger, color }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setShow(true);
    const timer = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(timer);
  }, [trigger]);

  if (!show) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="animate-ring rounded-full border-4"
        style={{
          width: 200,
          height: 200,
          borderColor: color || "hsl(173, 80%, 50%)",
        }}
      />
    </div>
  );
}
