# Space Impact Game

A modern remake of the classic Space Impact game using React and Vite.

![Space Impact Game Screenshot](https://img.shields.io/badge/Space%20Impact-Game-blue)

## About

Space Impact is a classic side-scrolling shooter game where you control a spaceship, shoot enemies, and avoid collisions. This implementation is built with React and Vite.

## How to Run the Project

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd space_impact_game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Open your browser and navigate to http://localhost:5173/

## How to Play

1. **Start the Game**
   - Click the "Start Game" button on the home screen

2. **Controls**
   - Use **Arrow Keys** (↑, ↓, ←, →) to navigate your spaceship
   - Press **Spacebar** to shoot enemies

3. **Gameplay**
   - Destroy enemy ships by shooting at them
   - Avoid collisions with enemies
   - Each enemy destroyed awards you 10 points
   - You have 3 lives, shown in the top right corner
   - Game ends when you lose all lives

4. **Game Over**
   - When game ends, your final score will be displayed
   - Click "Play Again" to restart

## Project Structure

The project is organized as follows:

```
src/
├── app/
│   ├── Game.jsx         # Main game component
│   └── page.jsx         # Home page component
├── App.tsx              # Root application component
├── App.css              # Application styles
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## Features

- Spaceship movement using arrow keys
- Shooting mechanism with spacebar
- Enemy spawning with random positions
- Collision detection for bullets and enemies
- Score tracking
- Lives system
- Game over screen with score display
- Responsive design

## Technologies

- React
- TypeScript/JavaScript
- Vite
- CSS

## Future Improvements

- Add different types of enemies
- Power-ups and special weapons
- Level progression
- High score leaderboard
- Sound effects and music
- Mobile touch controls

## License

MIT
