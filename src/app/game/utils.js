import { GAME_CONFIG } from './constants';

export const getWaveForScore = score => Math.floor(score / GAME_CONFIG.scorePerWave) + 1;

export const overlaps = (a, b) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const randomYWithinBounds = (containerHeight, objectHeight) => {
  return Math.random() * (containerHeight - objectHeight);
};
