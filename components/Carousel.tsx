"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; cap: string; tag: string };

const SLIDES: Slide[] = [
  { src: "/images/luffa.png", cap: "Espacio Su: Despierta tus sentidos llenos de aromas", tag: "Ritual" },
  { src: "/images/foto-01.jpeg", cap: "Rincón Calma Mía", tag: "Ritual" },
  { src: "/images/foto-02.jpeg", cap: "Aromatizantes 120ml", tag: "Aromas" },
  { src: "/images/foto-03.jpeg", cap: "Diario de Bienestar", tag: "Pausa" },
  { src: "/images/foto-04.jpeg", cap: "Jabones puro vegetal", tag: "Cuerpo" },
  { src: "/images/foto-05.jpeg", cap: "Rutina Ekos Cacao", tag: "Set" },
  { src: "/images/foto-06.jpeg", cap: "Jabones puro vegetal", tag: "Cuerpo" },
  { src: "/images/foto-07.jpeg", cap: "Línea Castaña", tag: "Hidratación" },
  { src: "/images/foto-08.jpeg", cap: "Crema Castaña", tag: "Manos" },
  { src: "/images/foto-09.jpeg", cap: "Labial Ekos", tag: "Maquillaje" },
  { src: "/images/foto-10.jpeg", cap: "Trio Castaña + Labial", tag: "Gift" },
  { src: "/images/foto-11.jpeg", cap: "Chronos Derma", tag: "Skincare" },
  { src: "/images/foto-12.jpeg", cap: "Manual de tu piel", tag: "Cuidado" },
  { src: "/images/foto-13.jpeg", cap: "Set Castaña en oferta", tag: "Regalo" },
  { src: "/images/foto-14.jpeg", cap: "Línea Tododia completa", tag: "Aromas" },
  { src: "/images/foto-15.jpeg", cap: "Calma Mía · Brumas", tag: "Bruma" },
  { src: "/images/foto-16.jpeg", cap: "Ritual flor de lis", tag: "Spa" },
];

export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [dotCount, setDotCount] = useState(6);
  const dragRef = useRef<{ start: number | null; offset: number }>({
    start: null,
    offset: 0,
  });
  const autoplayRef = useRef<number | null>(null);

  const pageCount = useCallback(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || !track.children[0]) return 1;
    const cardW =
      (track.children[0] as HTMLElement).getBoundingClientRect().width + 24;
    const visible = Math.max(1, Math.floor(wrap.getBoundingClientRect().width / cardW));
    return Math.max(1, SLIDES.length - visible + 1);
  }, []);

  const update = useCallback(
    (nextIdx?: number) => {
      const track = trackRef.current;
      if (!track || !track.children[0]) return;
      const cardW =
        (track.children[0] as HTMLElement).getBoundingClientRect().width + 24;
      const pc = pageCount();
      setIdx((cur) => {
        const target = nextIdx !== undefined ? nextIdx : cur;
        const clamped = Math.max(0, Math.min(target, pc - 1));
        track.style.transform = `translateX(-${clamped * cardW}px)`;
        return clamped;
      });
    },
    [pageCount]
  );

  useEffect(() => {
    const onResize = () => {
      setDotCount(Math.min(8, pageCount()));
      update();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pageCount, update]);

  /* autoplay */
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setIdx((cur) => {
        const pc = pageCount();
        const next = (cur + 1) % pc;
        update(next);
        return next;
      });
    }, 4200);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [pageCount, update]);

  const stopAuto = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    stopAuto();
    dragRef.current = { start: e.clientX, offset: 0 };
    const track = trackRef.current;
    if (track) track.style.transition = "none";
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (drag.start === null) return;
    drag.offset = e.clientX - drag.start;
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const cardW =
      (track.children[0] as HTMLElement).getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${-idx * cardW + drag.offset}px)`;
  };

  const onPointerUp = () => {
    const drag = dragRef.current;
    if (drag.start === null) return;
    const track = trackRef.current;
    if (track) track.style.transition = "";
    const cardW =
      ((track?.children[0] as HTMLElement)?.getBoundingClientRect().width ?? 0) + 24;
    let nextIdx = idx;
    if (Math.abs(drag.offset) > cardW / 4) {
      nextIdx = idx + (drag.offset < 0 ? 1 : -1);
    }
    dragRef.current = { start: null, offset: 0 };
    update(nextIdx);
  };

  const dots = Array.from({ length: dotCount }, (_, i) => i);
  const pc = pageCount();
  const max = Math.max(1, pc - 1);
  const ratio = idx / max;
  const activeDot = Math.round(ratio * (dotCount - 1));

  return (
    <section className="carousel-section section-pad" id="productos">
      <div className="container">
        <div className="carousel-head">
          <div className="reveal">
            <div className="section-eyebrow">Galería · 16 piezas</div>
            <h2 className="section-title">
              Pequeños rituales, <em>grandes</em>{" "}
              <span className="o">momentos.</span>
            </h2>
            <p
              style={{
                maxWidth: 540,
                color: "var(--ink-soft)",
                fontSize: 17,
              }}
            >
              Una selección curada de lo que cuidás cada día — cremas, aromas,
              regalos y rincones de calma. Pasá las imágenes con flechitas o
              arrastrando.
            </p>
          </div>
          <div className="carousel-controls">
            <button
              className="car-btn"
              onClick={() => {
                stopAuto();
                update(idx - 1);
              }}
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="car-btn"
              onClick={() => {
                stopAuto();
                update(idx + 1);
              }}
              aria-label="Siguiente"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="carousel-track-wrap" ref={wrapRef}>
          <div
            className="carousel-track"
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {SLIDES.map((s, i) => (
              <div className="car-card" key={i}>
                <span className="car-tag">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <img src={s.src} alt={s.cap} loading="lazy" />
                <div className="car-cap">
                  <small>{s.tag}</small>
                  {s.cap}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {dots.map((i) => (
            <button
              key={i}
              className={`dot ${i === activeDot ? "active" : ""}`}
              onClick={() => {
                stopAuto();
                const step = pc <= 1 ? 1 : (pc - 1) / (dotCount - 1);
                update(Math.round(i * step));
              }}
              aria-label={`Ir a página ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
