# 🚀 Space Impact Game - Fun Project!

A modern remake of the classic Space Impact game using React and Vite. Created for fun and nostalgia!

![Space Impact Game Screenshot](/public/assets/game-screenshot.png)


### Game Preview:

| Start Screen | Gameplay | Game Over |
|-------------|----------|-----------|
| ![Start Screen](/public/assets/start-screen.png) | ![Gameplay](/public/assets/gameplay.png) | ![Game Over](/public/assets/game-over.png) |


[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## About

Space Impact is a classic side-scrolling shooter game where you control a spaceship, shoot enemies, and avoid collisions. This implementation is built with React and Vite.

**This is a fun project** created for entertainment and educational purposes, showcasing game development concepts with modern web technologies. Feel free to play, learn from the code, and enjoy the nostalgic gameplay experience!

## System Requirements

- **Browser**: Modern browser with ES6 support (Chrome, Firefox, Safari, Edge)
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (or equivalent package manager)
- **Disk Space**: ~200 MB for node_modules and build files
- **Memory**: 512MB RAM minimum

## How to Run the Project

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd space_impact_game
   ```

2. **Install dependencies**
   ```bash
   # Using npm (with peer dependencies automatically installed)
   npm install --legacy-peer-deps
   
   # If you encounter any peer dependency issues, try:
   npm install --force
   
   # Using pnpm
   pnpm install
   
   # Using yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using pnpm
   pnpm dev
   
   # Using yarn
   yarn dev
   
   # For hosting on your network (accessible from other devices)
   npm run dev -- --host
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

## Troubleshooting

- **Game doesn't respond to keyboard input**: Click inside the game area to ensure it has focus before using the keyboard controls.
- **Performance issues**: If you experience lag, try closing other applications or browser tabs.
- **Dependency errors during installation**: Try using the `--legacy-peer-deps` or `--force` flag with npm as mentioned in the installation instructions.
- **Styling issues**: Make sure your browser is up to date. The game uses modern CSS features.

## Development

### Build for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm build

# Using yarn
yarn build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Credits

- Inspired by the classic Nokia Space Impact game
- Built with React and Vite for fun and learning
- Game development by Arafat
- Made with ❤️ as a fun side project
