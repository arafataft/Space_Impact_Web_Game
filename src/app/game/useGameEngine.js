import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BULLET_CONFIG,
  CONTROL_KEYS,
  ENEMY_BULLET_CONFIG,
  ENEMY_CONFIG,
  GAME_CONFIG,
  PLAYER_CONFIG,
} from './constants';
import { clamp, getWaveForScore, overlaps, randomYWithinBounds } from './utils';

const getInitialPlayerPosition = () => ({
  x: PLAYER_CONFIG.initialX,
  y: GAME_CONFIG.height / 2 - PLAYER_CONFIG.height / 2,
});

export const useGameEngine = () => {
  const [playerPosition, setPlayerPosition] = useState(getInitialPlayerPosition);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isInputActive, setIsInputActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const bulletsRef = useRef(bullets);
  const enemiesRef = useRef(enemies);
  const enemyBulletsRef = useRef(enemyBullets);
  const playerPositionRef = useRef(playerPosition);
  const waveRef = useRef(wave);
  const gameOverRef = useRef(gameOver);
  const gameStartedRef = useRef(gameStarted);
  const isPausedRef = useRef(isPaused);
  const isInputActiveRef = useRef(isInputActive);
  const nextIdRef = useRef(1);
  const lastPlayerDamageAtRef = useRef(0);

  const createId = useCallback(() => {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    return id;
  }, []);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  useEffect(() => {
    enemyBulletsRef.current = enemyBullets;
  }, [enemyBullets]);

  useEffect(() => {
    playerPositionRef.current = playerPosition;
  }, [playerPosition]);

  useEffect(() => {
    waveRef.current = wave;
  }, [wave]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    gameStartedRef.current = gameStarted;
  }, [gameStarted]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isInputActiveRef.current = isInputActive;
  }, [isInputActive]);

  useEffect(() => {
    try {
      const storedValue = Number(localStorage.getItem(GAME_CONFIG.highScoreKey) ?? '0');
      if (Number.isFinite(storedValue) && storedValue > 0) {
        setHighScore(storedValue);
      }
    } catch (error) {
      console.error('Unable to read high score from storage.', error);
    }
  }, []);

  useEffect(() => {
    if (!gameOver || score <= highScore) {
      return;
    }

    setHighScore(score);
    try {
      localStorage.setItem(GAME_CONFIG.highScoreKey, String(score));
    } catch (error) {
      console.error('Unable to persist high score.', error);
    }
  }, [gameOver, score, highScore]);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return undefined;
    }

    const loop = setInterval(() => {
      if (!gameStartedRef.current || gameOverRef.current || isPausedRef.current) {
        return;
      }

      const currentWave = waveRef.current;
      const enemySpeed = ENEMY_CONFIG.speedBase + (currentWave - 1) * ENEMY_CONFIG.speedStep;
      const enemySpawnChance = Math.min(
        ENEMY_CONFIG.spawnBase + (currentWave - 1) * ENEMY_CONFIG.spawnStep,
        ENEMY_CONFIG.spawnCap
      );
      const enemyBulletSpeed =
        ENEMY_BULLET_CONFIG.speedBase + (currentWave - 1) * ENEMY_BULLET_CONFIG.speedStep;
      const enemyFireChance = Math.min(
        ENEMY_BULLET_CONFIG.fireBase + (currentWave - 1) * ENEMY_BULLET_CONFIG.fireStep,
        ENEMY_BULLET_CONFIG.fireCap
      );

      const nextBullets = bulletsRef.current
        .map(bullet => ({ ...bullet, x: bullet.x + BULLET_CONFIG.speed }))
        .filter(bullet => bullet.x < GAME_CONFIG.width);

      let nextEnemies = enemiesRef.current
        .map(enemy => ({ ...enemy, x: enemy.x - enemySpeed }))
        .filter(enemy => enemy.x + ENEMY_CONFIG.width > 0);

      let nextEnemyBullets = enemyBulletsRef.current
        .map(bullet => ({ ...bullet, x: bullet.x - enemyBulletSpeed }))
        .filter(bullet => bullet.x + ENEMY_BULLET_CONFIG.width > 0);

      if (Math.random() < enemySpawnChance) {
        nextEnemies.push({
          id: createId(),
          x: GAME_CONFIG.width - ENEMY_CONFIG.width,
          y: randomYWithinBounds(GAME_CONFIG.height, ENEMY_CONFIG.height),
          kind: 'basic',
        });
      }

      nextEnemies.forEach(enemy => {
        if (Math.random() < enemyFireChance) {
          nextEnemyBullets.push({
            id: createId(),
            x: enemy.x,
            y: enemy.y + ENEMY_CONFIG.height / 2 - ENEMY_BULLET_CONFIG.height / 2,
          });
        }
      });

      const destroyedEnemyIds = new Set();
      const nextSurvivingBullets = [];
      let scoreGain = 0;

      nextBullets.forEach(bullet => {
        const hitEnemy = nextEnemies.find(enemy => {
          if (destroyedEnemyIds.has(enemy.id)) {
            return false;
          }

          return overlaps(
            { x: bullet.x, y: bullet.y, width: BULLET_CONFIG.width, height: BULLET_CONFIG.height },
            { x: enemy.x, y: enemy.y, width: ENEMY_CONFIG.width, height: ENEMY_CONFIG.height }
          );
        });

        if (hitEnemy) {
          destroyedEnemyIds.add(hitEnemy.id);
          scoreGain += GAME_CONFIG.scorePerEnemy;
          return;
        }

        nextSurvivingBullets.push(bullet);
      });

      if (destroyedEnemyIds.size > 0) {
        nextEnemies = nextEnemies.filter(enemy => !destroyedEnemyIds.has(enemy.id));
      }

      const playerRect = {
        x: playerPositionRef.current.x,
        y: playerPositionRef.current.y,
        width: PLAYER_CONFIG.width,
        height: PLAYER_CONFIG.height,
      };

      let wasHitByEnemy = false;
      nextEnemies = nextEnemies.filter(enemy => {
        const didCollide = overlaps(playerRect, {
          x: enemy.x,
          y: enemy.y,
          width: ENEMY_CONFIG.width,
          height: ENEMY_CONFIG.height,
        });

        if (didCollide) {
          wasHitByEnemy = true;
          return false;
        }

        return true;
      });

      let wasHitByEnemyBullet = false;
      nextEnemyBullets = nextEnemyBullets.filter(enemyBullet => {
        const didCollide = overlaps(playerRect, {
          x: enemyBullet.x,
          y: enemyBullet.y,
          width: ENEMY_BULLET_CONFIG.width,
          height: ENEMY_BULLET_CONFIG.height,
        });

        if (didCollide) {
          wasHitByEnemyBullet = true;
          return false;
        }

        return true;
      });

      setBullets(nextSurvivingBullets);
      setEnemies(nextEnemies);
      setEnemyBullets(nextEnemyBullets);

      if (scoreGain > 0) {
        setScore(previousScore => {
          const updatedScore = previousScore + scoreGain;
          const derivedWave = getWaveForScore(updatedScore);
          if (derivedWave !== waveRef.current) {
            setWave(derivedWave);
          }
          return updatedScore;
        });
      }

      const isDamageCooldownOver =
        Date.now() - lastPlayerDamageAtRef.current > GAME_CONFIG.playerInvulnerableMs;

      if (isDamageCooldownOver && (wasHitByEnemy || wasHitByEnemyBullet)) {
        lastPlayerDamageAtRef.current = Date.now();
        setLives(previousLives => {
          const updatedLives = Math.max(previousLives - 1, 0);
          if (updatedLives === 0) {
            setGameOver(true);
          }
          return updatedLives;
        });
      }
    }, GAME_CONFIG.tickMs);

    return () => clearInterval(loop);
  }, [createId, gameOver, gameStarted]);

  const shoot = useCallback(() => {
    setBullets(previousBullets => [
      ...previousBullets,
      {
        id: createId(),
        x: playerPositionRef.current.x + PLAYER_CONFIG.width,
        y: playerPositionRef.current.y + PLAYER_CONFIG.height / 2 - BULLET_CONFIG.height / 2,
      },
    ]);
  }, [createId]);

  const movePlayer = useCallback(direction => {
    setPlayerPosition(previous => {
      const nextPosition = { ...previous };
      if (direction === CONTROL_KEYS.up) {
        nextPosition.y = clamp(previous.y - PLAYER_CONFIG.step, 0, GAME_CONFIG.height - PLAYER_CONFIG.height);
      }

      if (direction === CONTROL_KEYS.down) {
        nextPosition.y = clamp(previous.y + PLAYER_CONFIG.step, 0, GAME_CONFIG.height - PLAYER_CONFIG.height);
      }

      if (direction === CONTROL_KEYS.left) {
        nextPosition.x = clamp(previous.x - PLAYER_CONFIG.step, 0, GAME_CONFIG.width - PLAYER_CONFIG.width);
      }

      if (direction === CONTROL_KEYS.right) {
        nextPosition.x = clamp(previous.x + PLAYER_CONFIG.step, 0, GAME_CONFIG.width - PLAYER_CONFIG.width);
      }

      return nextPosition;
    });
  }, []);

  const onKeyDown = useCallback(
    event => {
      if (!gameStartedRef.current || gameOverRef.current || !isInputActiveRef.current) {
        return;
      }

      if (event.key === CONTROL_KEYS.pauseLower || event.key === CONTROL_KEYS.pauseUpper) {
        setIsPaused(previous => !previous);
        return;
      }

      if (isPausedRef.current) {
        return;
      }

      if (
        event.key === CONTROL_KEYS.up ||
        event.key === CONTROL_KEYS.down ||
        event.key === CONTROL_KEYS.left ||
        event.key === CONTROL_KEYS.right
      ) {
        event.preventDefault();
        movePlayer(event.key);
        return;
      }

      if (event.key === CONTROL_KEYS.shootPrimary || event.key === CONTROL_KEYS.shootLegacy) {
        event.preventDefault();
        shoot();
      }
    },
    [movePlayer, shoot]
  );

  const startGame = useCallback(() => {
    setPlayerPosition(getInitialPlayerPosition());
    setBullets([]);
    setEnemies([]);
    setEnemyBullets([]);
    setScore(0);
    setLives(3);
    setWave(1);
    setIsPaused(false);
    setIsInputActive(true);
    setGameOver(false);
    setGameStarted(true);
    lastPlayerDamageAtRef.current = 0;
  }, []);

  const togglePause = useCallback(() => {
    if (!gameStarted || gameOver) {
      return;
    }
    setIsPaused(previous => !previous);
  }, [gameOver, gameStarted]);

  const gameBoardStyle = useMemo(
    () => ({
      width: `${GAME_CONFIG.width}px`,
      height: `${GAME_CONFIG.height}px`,
    }),
    []
  );

  return {
    state: {
      bullets,
      enemies,
      enemyBullets,
      gameOver,
      gameStarted,
      highScore,
      isPaused,
      lives,
      playerPosition,
      score,
      wave,
    },
    actions: {
      movePlayer,
      shoot,
      startGame,
      togglePause,
      onKeyDown,
      setIsInputActive,
    },
    config: {
      gameBoardStyle,
      game: GAME_CONFIG,
      player: PLAYER_CONFIG,
      bullet: BULLET_CONFIG,
      enemy: ENEMY_CONFIG,
      enemyBullet: ENEMY_BULLET_CONFIG,
    },
  };
};
