"use client";

import { useEffect, useState } from "react";

const VISIBLE_MS = 3200;
const FADE_MS = 700;

export default function WelcomeSplash() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => setPhase("out"), VISIBLE_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("espacio-su:welcome-done"));
    }, VISIBLE_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`welcome-splash welcome-splash--${phase}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando sitio web"
    >
      <div className="welcome-splash__glow" aria-hidden="true" />
      <div className="welcome-splash__content">
        <p className="welcome-splash__eyebrow">Espacio Su</p>
        <h1 className="welcome-splash__title">Bienvenidos a mi espacio…</h1>
        <p className="welcome-splash__subtitle">Cargando sitio web</p>
        <div className="welcome-splash__bar" aria-hidden="true">
          <span className="welcome-splash__bar-fill" />
        </div>
      </div>
    </div>
  );
}
