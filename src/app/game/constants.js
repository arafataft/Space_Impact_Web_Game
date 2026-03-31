export const GAME_CONFIG = {
  width: 900,
  height: 500,
  tickMs: 80,
  playerInvulnerableMs: 500,
  scorePerEnemy: 10,
  scorePerWave: 120,
  highScoreKey: 'space-impact-high-score',
};

export const PLAYER_CONFIG = {
  width: 52,
  height: 32,
  step: 24,
  initialX: 56,
};

export const BULLET_CONFIG = {
  width: 10,
  height: 5,
  speed: 16,
};

export const ENEMY_CONFIG = {
  width: 40,
  height: 30,
  speedBase: 4,
  speedStep: 0.7,
  spawnBase: 0.016,
  spawnStep: 0.005,
  spawnCap: 0.11,
};

export const ENEMY_BULLET_CONFIG = {
  width: 8,
  height: 4,
  speedBase: 6,
  speedStep: 0.6,
  fireBase: 0.004,
  fireStep: 0.001,
  fireCap: 0.03,
};

export const CONTROL_KEYS = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  pauseLower: 'p',
  pauseUpper: 'P',
  shootPrimary: ' ',
  shootLegacy: 'Spacebar',
};
