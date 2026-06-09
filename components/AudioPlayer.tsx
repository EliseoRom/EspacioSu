"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/primer-rayo-de-sol.mp3";
const DEFAULT_VOLUME = 0.8;
const WELCOME_DONE_EVENT = "espacio-su:welcome-done";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [visible, setVisible] = useState(false);

  const applyVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = v;
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = volume;
      await audio.play();
      setPlaying(true);
      started.current = true;
      return true;
    } catch {
      return false;
    }
  }, [volume]);

  const setVolumeFromY = useCallback((clientY: number) => {
    const track = sliderRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = 1 - (clientY - rect.top) / rect.height;
    const next = Math.min(1, Math.max(0, ratio));
    setVolume(+next.toFixed(2));
  }, []);

  useEffect(() => {
    applyVolume(DEFAULT_VOLUME);
    const timer = window.setTimeout(() => setVisible(true), 600);

    const audio = audioRef.current;
    if (!audio) return () => clearTimeout(timer);

    audio.load();

    const tryStart = () => {
      if (started.current) return;
      play();
    };

    const onInteraction = () => tryStart();

    const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;
    interactionEvents.forEach((event) => {
      document.addEventListener(event, onInteraction, { capture: true });
    });

    const onWelcomeDone = () => tryStart();
    window.addEventListener(WELCOME_DONE_EVENT, onWelcomeDone);
    audio.addEventListener("canplaythrough", tryStart, { once: true });

    tryStart();
    const retries = [200, 600, 1200, 2500, 4000].map((ms) =>
      window.setTimeout(tryStart, ms)
    );

    return () => {
      clearTimeout(timer);
      retries.forEach(clearTimeout);
      interactionEvents.forEach((event) => {
        document.removeEventListener(event, onInteraction, { capture: true });
      });
      window.removeEventListener(WELCOME_DONE_EVENT, onWelcomeDone);
    };
  }, [applyVolume, play]);

  useEffect(() => {
    applyVolume(volume);
  }, [volume, applyVolume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      started.current = false;
    } else {
      play();
    }
  };

  const onSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setVolumeFromY(e.clientY);
    play();
  };

  const onSliderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setVolumeFromY(e.clientY);
  };

  const onSliderPointerUp = () => {
    dragging.current = false;
  };

  const volumePct = Math.round(volume * 100);

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        autoPlay
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div
        className={`audio-glass ${visible ? "audio-glass--visible" : ""}`}
        role="group"
        aria-label="Control de música de fondo"
      >
        <div className="audio-glass__shine" aria-hidden="true" />

        <button
          type="button"
          className="audio-glass__btn audio-glass__btn--play"
          onClick={togglePlay}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          )}
        </button>

        <div className="audio-glass__vol">
          <svg
            className="audio-glass__icon audio-glass__icon--high"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 5L6 9H3v6h3l5 4V5z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M15.5 8.5a5 5 0 010 7"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M18 6a8.5 8.5 0 010 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={sliderRef}
            className="audio-glass__slider"
            role="slider"
            aria-label="Volumen"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={volumePct}
            aria-orientation="vertical"
            onPointerDown={onSliderPointerDown}
            onPointerMove={onSliderPointerMove}
            onPointerUp={onSliderPointerUp}
            onPointerCancel={onSliderPointerUp}
          >
            <div className="audio-glass__slider-track" aria-hidden="true">
              <div
                className="audio-glass__slider-fill"
                style={{ height: `${volumePct}%` }}
              />
            </div>
            <div
              className="audio-glass__slider-thumb"
              style={{ bottom: `calc(${volumePct}% - 5px)` }}
              aria-hidden="true"
            />
          </div>

          <svg
            className="audio-glass__icon audio-glass__icon--low"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 5L6 9H3v6h3l5 4V5z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
