import React, { useState, useEffect, useCallback } from 'react';

// This is the main Game component for Space Impact
const Game = () => {
  // Game state will be managed here
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 250 });
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 400;
  const PLAYER_WIDTH = 50;
  const PLAYER_HEIGHT = 30;
  const BULLET_WIDTH = 10;
  const BULLET_HEIGHT = 5;
  const ENEMY_WIDTH = 40;
  const ENEMY_HEIGHT = 30;

  // Basic game loop (will be expanded)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move bullets
      setBullets(prevBullets => 
        prevBullets
          .map(b => ({ ...b, x: b.x + 15 }))
          .filter(b => b.x < GAME_WIDTH)
      );

      // Move enemies (simple leftward movement for now)
      setEnemies(prevEnemies =>
        prevEnemies
          .map(e => ({ ...e, x: e.x - 5 }))
          .filter(e => e.x + ENEMY_WIDTH > 0)
      );

      // Spawn new enemies randomly
      if (Math.random() < 0.02) { // Adjust spawn rate as needed
        setEnemies(prevEnemies => [
          ...prevEnemies,
          {
            id: Date.now(),
            x: GAME_WIDTH - ENEMY_WIDTH,
            y: Math.random() * (GAME_HEIGHT - ENEMY_HEIGHT),
            type: 'basic', // For future expansion
          },
        ]);
      }

      // Collision detection: bullets vs enemies
      setBullets(prevBullets => {
        const bulletsToRemove = new Set();
        const enemiesToRemove = new Set();

        prevBullets.forEach(bullet => {
          enemies.forEach(enemy => {
            if (
              bullet.x < enemy.x + ENEMY_WIDTH &&
              bullet.x + BULLET_WIDTH > enemy.x &&
              bullet.y < enemy.y + ENEMY_HEIGHT &&
              bullet.y + BULLET_HEIGHT > enemy.y
            ) {
              bulletsToRemove.add(bullet.id);
              enemiesToRemove.add(enemy.id);
              setScore(s => s + 10);
            }
          });
        });

        setEnemies(prevEnemies => prevEnemies.filter(e => !enemiesToRemove.has(e.id)));
        return prevBullets.filter(b => !bulletsToRemove.has(b.id));
      });

      // Collision detection: player vs enemies
      enemies.forEach(enemy => {
        if (
          playerPosition.x < enemy.x + ENEMY_WIDTH &&
          playerPosition.x + PLAYER_WIDTH > enemy.x &&
          playerPosition.y < enemy.y + ENEMY_HEIGHT &&
          playerPosition.y + PLAYER_HEIGHT > enemy.y
        ) {
          setLives(l => l - 1);
          setEnemies(prevEnemies => prevEnemies.filter(e => e.id !== enemy.id)); // Remove collided enemy
          if (lives -1 <= 0) {
            setGameOver(true);
          }
        }
      });

    }, 100); // Game loop interval (adjust for speed)

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, enemies, playerPosition, lives]);

  // Handle player input
  const handleKeyDown = useCallback((e) => {
    if (!gameStarted || gameOver) return;

    setPlayerPosition(prevPos => {
      let newX = prevPos.x;
      let newY = prevPos.y;
      const step = 20;

      switch (e.key) {
        case 'ArrowUp':
          newY = Math.max(0, prevPos.y - step);
          break;
        case 'ArrowDown':
          newY = Math.min(GAME_HEIGHT - PLAYER_HEIGHT, prevPos.y + step);
          break;
        case 'ArrowLeft':
          newX = Math.max(0, prevPos.x - step);
          break;
        case 'ArrowRight':
          newX = Math.min(GAME_WIDTH - PLAYER_WIDTH, prevPos.x + step);
          break;
        case ' ':
        case 'Spacebar': // Handle spacebar for shooting
          setBullets(prevBullets => [
            ...prevBullets,
            {
              id: Date.now(),
              x: prevPos.x + PLAYER_WIDTH,
              y: prevPos.y + PLAYER_HEIGHT / 2 - BULLET_HEIGHT / 2,
            },
          ]);
          break;
        default:
          break;
      }
      return { x: newX, y: newY };
    });
  }, [gameStarted, gameOver, PLAYER_HEIGHT, PLAYER_WIDTH, GAME_HEIGHT, GAME_WIDTH]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, gameStarted, gameOver]);

  const startGame = () => {
    setPlayerPosition({ x: 50, y: GAME_HEIGHT / 2 - PLAYER_HEIGHT / 2 });
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Space Impact</h1>
        <button onClick={startGame} style={{ fontSize: '20px', padding: '10px 20px' }}>
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <button onClick={startGame} style={{ fontSize: '20px', padding: '10px 20px' }}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        border: '1px solid black',
        margin: '20px auto',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000020' // Dark blue background
      }}
      tabIndex={0} // Make div focusable to receive key events
    >
      {/* Player */}
      <div 
        style={{
          position: 'absolute',
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`,
          width: `${PLAYER_WIDTH}px`,
          height: `${PLAYER_HEIGHT}px`,
          backgroundColor: 'lime', // Green player
          // Simple triangle shape for player using borders
          clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
        }}
      />
      {/* Bullets */}
      {bullets.map(bullet => (
        <div 
          key={bullet.id}
          style={{
            position: 'absolute',
            left: `${bullet.x}px`,
            top: `${bullet.y}px`,
            width: `${BULLET_WIDTH}px`,
            height: `${BULLET_HEIGHT}px`,
            backgroundColor: 'yellow',
          }}
        />
      ))}
      {/* Enemies */}
      {enemies.map(enemy => (
        <div 
          key={enemy.id}
          style={{
            position: 'absolute',
            left: `${enemy.x}px`,
            top: `${enemy.y}px`,
            width: `${ENEMY_WIDTH}px`,
            height: `${ENEMY_HEIGHT}px`,
            backgroundColor: 'red',
            // Simple block enemy for now
          }}
        />
      ))}
      {/* Score and Lives Display */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', fontSize: '18px' }}>
        Score: {score}
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', fontSize: '18px' }}>
        Lives: {lives}
      </div>
    </div>
  );
};

export default Game;

