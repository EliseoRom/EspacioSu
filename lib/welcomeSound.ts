export type WelcomeSoundHandle = {
  stop: () => void;
};

export function playWelcomeSound(): WelcomeSoundHandle | null {
  if (typeof window === "undefined") return null;

  const AudioCtx =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;

  const ctx = new AudioCtx();
  const master = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.6;
  filter.connect(master);
  master.connect(ctx.destination);

  const oscillators: OscillatorNode[] = [];
  const partials = [
    { freq: 196.0, gain: 0.045 },
    { freq: 293.66, gain: 0.035 },
    { freq: 392.0, gain: 0.028 },
    { freq: 523.25, gain: 0.018 },
  ];

  partials.forEach(({ freq, gain }) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const nodeGain = ctx.createGain();
    nodeGain.gain.value = gain;
    osc.connect(nodeGain);
    nodeGain.connect(filter);
    osc.start();
    oscillators.push(osc);
  });

  const shimmer = ctx.createOscillator();
  shimmer.type = "triangle";
  shimmer.frequency.value = 2.4;
  const shimmerDepth = ctx.createGain();
  shimmerDepth.gain.value = 6;
  shimmer.connect(shimmerDepth);
  const carrier = ctx.createOscillator();
  carrier.type = "sine";
  carrier.frequency.value = 659.25;
  const carrierGain = ctx.createGain();
  carrierGain.gain.value = 0.012;
  shimmerDepth.connect(carrier.frequency);
  carrier.connect(carrierGain);
  carrierGain.connect(filter);
  shimmer.start();
  carrier.start();
  oscillators.push(shimmer, carrier);

  const now = ctx.currentTime;
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.28, now + 1.1);
  master.gain.setValueAtTime(0.28, now + 2.6);
  master.gain.linearRampToValueAtTime(0, now + 3.6);

  const resume = () => ctx.resume().catch(() => {});
  resume();

  const onGesture = () => {
    resume();
    window.removeEventListener("pointerdown", onGesture);
    window.removeEventListener("keydown", onGesture);
  };
  window.addEventListener("pointerdown", onGesture, { once: true });
  window.addEventListener("keydown", onGesture, { once: true });

  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    window.removeEventListener("pointerdown", onGesture);
    window.removeEventListener("keydown", onGesture);

    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0, t + 0.65);

    window.setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      });
      ctx.close().catch(() => {});
    }, 700);
  };

  return { stop };
}
