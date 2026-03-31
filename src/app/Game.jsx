import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import './Game.css';
import { useGameEngine } from './game/useGameEngine';

const Game = () => {
  const {
    state: { playerPosition, bullets, enemies, enemyBullets, score, highScore, lives, wave, gameOver, gameStarted, isPaused },
    actions: { startGame, togglePause, onKeyDown, setIsInputActive },
    config: { gameBoardStyle, player, bullet, enemy, enemyBullet },
  } = useGameEngine();

  const boardRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameOver && boardRef.current) {
      boardRef.current.focus();
    }
  }, [gameStarted, gameOver]);

  const liveStatus = `Score ${score}, Lives ${lives}, Wave ${wave}${isPaused ? ', Paused' : ''}`;

  return (
    <section className="game-shell" aria-label="Space Impact game container">
      <motion.div
        className="game-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <header className="game-header">
          <div>
            <h1 className="game-title">Space Impact</h1>
            <p className="game-subtitle">Survive incoming waves and push your best score.</p>
          </div>
          <div className="hud" aria-label="Current game stats">
            {[`Score: ${score}`, `Lives: ${lives}`, `Wave: ${wave}`, `High: ${highScore}`].map(label => (
              <motion.span
                key={label}
                className="hud-chip"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </header>

        <div className="game-board-wrap">
          <div
            ref={boardRef}
            className="game-board"
            style={gameBoardStyle}
            role="region"
            aria-label="Playable game board"
            aria-describedby="game-instructions"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
          >
            <span className="sr-only" aria-live="polite">
              {liveStatus}
            </span>

            <div
              className="player"
              style={{
                left: `${playerPosition.x}px`,
                top: `${playerPosition.y}px`,
                width: `${player.width}px`,
                height: `${player.height}px`,
              }}
              aria-label="Player ship"
            />

            {bullets.map(item => (
              <div
                key={item.id}
                className="player-bullet"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${bullet.width}px`,
                  height: `${bullet.height}px`,
                }}
                aria-hidden="true"
              />
            ))}

            {enemies.map(item => (
              <div
                key={item.id}
                className="enemy"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${enemy.width}px`,
                  height: `${enemy.height}px`,
                }}
                aria-hidden="true"
              />
            ))}

            {enemyBullets.map(item => (
              <div
                key={item.id}
                className="enemy-bullet"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${enemyBullet.width}px`,
                  height: `${enemyBullet.height}px`,
                }}
                aria-hidden="true"
              />
            ))}

            <AnimatePresence>
              {!gameStarted && (
                <motion.div
                  className="overlay"
                  role="region"
                  aria-label="Start game panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                <h2>Ready for Launch</h2>
                <p>Start your mission and clear as many enemy units as possible.</p>
                <p>Current High Score: {highScore}</p>
                <motion.button
                  type="button"
                  className="primary-btn"
                  onClick={startGame}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Game
                </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {gameOver && (
                <motion.div
                  className="overlay"
                  role="status"
                  aria-live="assertive"
                  aria-label="Game over panel"
                  initial={{ opacity: 0, scale: 0.98, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
                >
                <h3>Game Over</h3>
                <p>Final Score: {score}</p>
                <p>Best Score: {highScore}</p>
                <motion.button
                  type="button"
                  className="primary-btn"
                  onClick={startGame}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Play Again
                </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isPaused && gameStarted && !gameOver && (
                <motion.div
                  className="overlay"
                  role="status"
                  aria-label="Game paused panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                <h3>Paused</h3>
                <p>Press P to continue the mission.</p>
                <motion.button
                  type="button"
                  className="secondary-btn"
                  onClick={togglePause}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Resume
                </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <p id="game-instructions" className="controls">
        Controls: Arrow keys to move, Space to shoot, P to pause and resume.
      </p>
    </section>
  );
};

export default Game;

