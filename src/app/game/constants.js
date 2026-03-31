export const GAME_CONFIG = {
  width: 700,
  height: 360,
  tickMs: 80,
  playerInvulnerableMs: 500,
  scorePerEnemy: 10,
  scorePerWave: 120,
  highScoreKey: 'space-impact-high-score',
};

export const PLAYER_CONFIG = {
  width: 28,
  height: 16,
  step: 16,
  initialX: 40,
};

export const BULLET_CONFIG = {
  width: 6,
  height: 3,
  speed: 14,
};

export const ENEMY_CONFIG = {
  width: 26,
  height: 22,
  speedBase: 3.4,
  speedStep: 0.55,
  spawnBase: 0.02,
  spawnStep: 0.004,
  spawnCap: 0.1,
};

export const ENEMY_BULLET_CONFIG = {
  width: 5,
  height: 3,
  speedBase: 5,
  speedStep: 0.45,
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
