"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "./useReveal";

type TwSpec = { text: string; delay: number; className?: string };

function Typewriter({ specs }: { specs: TwSpec[] }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const timers: number[] = [];
    specs.forEach((spec, idx) => {
      const el = refs.current[idx];
      if (!el) return;
      el.textContent = "";
      const t = window.setTimeout(() => {
        let i = 0;
        const speed = 55 + Math.random() * 20;
        const tick = () => {
          if (i < spec.text.length) {
            el.textContent += spec.text.charAt(i);
            i++;
            const t2 = window.setTimeout(
              tick,
              speed + (Math.random() * 30 - 15)
            );
            timers.push(t2);
          } else {
            const t3 = window.setTimeout(() => el.classList.add("done"), 800);
            timers.push(t3);
          }
        };
        tick();
      }, spec.delay);
      timers.push(t);
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [specs]);

  return (
    <>
      {specs.map((s, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`tw ${s.className ?? ""}`}
        />
      ))}
    </>
  );
}

const LEAVES = [
  // Cluster 1: Top-Left (4 leaves close to each other)
  { left: 3, top: 8, size: 120, color: "#3B6114", anim: "l1", opacity: 0.35 },
  { left: 6, top: 14, size: 90, color: "#4E8019", anim: "l2", opacity: 0.3 },
  { left: 4, top: 22, size: 105, color: "#5F9424", anim: "l3", opacity: 0.28 },
  { left: 11, top: 9, size: 75, color: "#4E8019", anim: "l4", opacity: 0.32 },
  
  // Cluster 2: Bottom-Left (4 leaves close to each other)
  { left: 4, top: 68, size: 130, color: "#3B6114", anim: "l5", opacity: 0.38 },
  { left: 9, top: 74, size: 95, color: "#4E8019", anim: "l6", opacity: 0.3 },
  { left: 3, top: 82, size: 110, color: "#5F9424", anim: "l7", opacity: 0.28 },
  { left: 12, top: 64, size: 80, color: "#3B6114", anim: "l1", opacity: 0.34 },

  // Cluster 3: Top-Right (4 leaves close to each other)
  { left: 82, top: 6, size: 120, color: "#4E8019", anim: "l2", opacity: 0.35 },
  { left: 77, top: 12, size: 85, color: "#5F9424", anim: "l3", opacity: 0.28 },
  { left: 88, top: 15, size: 100, color: "#4E8019", anim: "l4", opacity: 0.3 },
  { left: 79, top: 22, size: 75, color: "#3B6114", anim: "l5", opacity: 0.32 },

  // Cluster 4: Bottom-Right (4 leaves close to each other)
  { left: 84, top: 66, size: 125, color: "#3B6114", anim: "l6", opacity: 0.36 },
  { left: 79, top: 74, size: 90, color: "#4E8019", anim: "l7", opacity: 0.3 },
  { left: 88, top: 80, size: 105, color: "#5F9424", anim: "l1", opacity: 0.28 },
  { left: 74, top: 60, size: 85, color: "#4E8019", anim: "l2", opacity: 0.34 },

  // Scattered in background (to blend)
  { left: 24, top: 16, size: 70, color: "#8FC93A", anim: "l3", opacity: 0.25 },
  { left: 28, top: 46, size: 80, color: "#4E8019", anim: "l4", opacity: 0.28 },
  { left: 38, top: 76, size: 110, color: "#3B6114", anim: "l5", opacity: 0.35 },
  { left: 58, top: 8, size: 95, color: "#5F9424", anim: "l6", opacity: 0.26 },
  { left: 66, top: 32, size: 75, color: "#A7D46F", anim: "l7", opacity: 0.22 },
  { left: 62, top: 75, size: 115, color: "#3B6114", anim: "l1", opacity: 0.35 },
];

export default function Hero() {
  useReveal();
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const wrappers = hero.querySelectorAll(".leaf-wrapper");
      wrappers.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const leftPercent = parseFloat(htmlEl.dataset.left || "0");
        const topPercent = parseFloat(htmlEl.dataset.top || "0");
        
        // Calculate the base center position of the leaf in pixels
        const leafX = (rect.width * leftPercent) / 100;
        const leafY = (rect.height * topPercent) / 100;

        const dx = leafX - mouseX;
        const dy = leafY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const radius = 250; // Distance at which leaves start reacting
        const maxPush = 110; // Maximum push distance (pixels)

        if (distance < radius) {
          const force = (radius - distance) / radius;
          // Calculate angle to push leaf away from mouse
          const angle = Math.atan2(dy, dx);
          // Easing logic (quadratic easing out) for smoother force
          const easeForce = force * (2 - force);
          const pushX = Math.cos(angle) * easeForce * maxPush;
          const pushY = Math.sin(angle) * easeForce * maxPush;

          htmlEl.style.transform = `translate(${pushX}px, ${pushY}px)`;
        } else {
          htmlEl.style.transform = "translate(0px, 0px)";
        }
      });
    };

    const handleMouseLeave = () => {
      const wrappers = hero.querySelectorAll(".leaf-wrapper");
      wrappers.forEach((el) => {
        (el as HTMLElement).style.transform = "translate(0px, 0px)";
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <header className="hero" id="home" ref={heroRef}>
      {LEAVES.map((leaf, index) => (
        <div
          key={index}
          className="leaf-wrapper"
          style={{
            left: `${leaf.left}%`,
            top: `${leaf.top}%`,
            width: leaf.size,
            height: leaf.size,
          }}
          data-left={leaf.left}
          data-top={leaf.top}
        >
          <svg className={`leaf ${leaf.anim}`} viewBox="0 0 100 100" fill="none">
            <path
              d="M50 10 Q 80 30 70 60 Q 50 90 30 60 Q 20 30 50 10 Z"
              fill={leaf.color}
              opacity={leaf.opacity}
            />
            {/* Detailed leaf veins */}
            <path
              d="M50 12 L 50 82"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Lateral veins (left) */}
            <path
              d="M50 25 Q 40 28 35 32"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 40 Q 36 45 30 52"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 55 Q 36 62 32 70"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 70 Q 42 75 38 80"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lateral veins (right) */}
            <path
              d="M50 25 Q 60 28 65 32"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 40 Q 64 45 70 52"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 55 Q 64 62 68 70"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 70 Q 58 75 62 80"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ))}

      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow">
            Despierta tus sentidos llenos de aromas
          </div>
          <h1>
            <span className="hero-first-line">
              <Typewriter
                specs={[
                  { text: "Apreciar", delay: 200 },
                  { text: " cada", delay: 700 },
                  { text: " día más", delay: 1000, className: "accent-g" },
                ]}
              />
            </span>
            <br />
            <Typewriter
              specs={[
                { text: "el", delay: 1600 },
                { text: " cuerpo,", delay: 1800, className: "accent-o" },
                { text: " cuidarlo", delay: 2400 },
              ]}
            />
            <br />
            <Typewriter
              specs={[
                { text: "por", delay: 3200 },
                { text: " dentro", delay: 3400, className: "accent-g" },
                { text: " y por", delay: 3900 },
                { text: " fuera.", delay: 4300, className: "accent-o" },
              ]}
            />
          </h1>
          <p className="hero-manifest reveal">
            Con{" "}
            <em
              style={{
                color: "var(--orange-deep)",
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
              }}
            >
              dedicación
            </em>{" "}
            y{" "}
            <em
              style={{
                color: "var(--green-deep)",
                fontStyle: "italic",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
              }}
            >
              amor
            </em>{" "}
            por lo que hago, desde este espacio mío para vos. Aromas, rituales y
            cuidado natural pensados para que tu día se sienta más liviano, más
            tuyo.
          </p>
          <div className="hero-ctas reveal">
            <a href="#productos" className="btn btn-primary">
              Descubrir aromas <span>→</span>
            </a>
            <a
              href="https://www.naturacosmeticos.com.ar/consultoria/surincondearomas"
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conocer más
            </a>
          </div>
        </div>

        <div className="hero-collage">
          <div className="hc-badge">
            <div>
              <span className="star">✦</span>
              <span>Hecho · con · amor</span>
              <span>Espacio · Su · 2026 ·</span>
            </div>
          </div>
          <div className="hc-frame hc-1">
            <img src="/images/foto-08.jpeg" alt="Ritual calma" />
          </div>
          <div className="hc-frame hc-2">
            <img src="/images/foto-16.jpeg" alt="Línea aromática" />
          </div>
          <div className="hc-frame hc-3">
            <img src="/images/foto-04.jpeg" alt="Detalle" />
          </div>
        </div>
      </div>
    </header>
  );
}
