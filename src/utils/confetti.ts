import confetti from 'canvas-confetti';
import { sounds } from './soundEffects';

export const triggerBirthdayConfetti = () => {
  sounds.playBlast();

  // Burst 1: Center fireworks
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
  });

  // Burst 2 & 3: Side cannons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: ['#fbbf24', '#f97316', '#e11d48']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#c084fc']
    });
  }, 250);
};

export const triggerStarConfetti = () => {
  sounds.playHorn();
  const defaults = { spread: 360, ticks: 70, gravity: 0, decay: 0.94, startVelocity: 30, shapes: ['star' as any], colors: ['#FFE83F', '#FFB703', '#FB8500', '#FF006E'] };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 0.75,
  });
};
