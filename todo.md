## I. Project Setup & Basic Structure (React)
- [X] Initialize React project (`create_react_app space_impact_game`)
- [X] Create main `Game.js` component within `/home/ubuntu/space_impact_game/src/app/`
- [X] Integrate `Game.js` into `page.js` (or the main app component)

## II. Game Area & Player
- [X] Define Game Area (e.g., using a `div` with fixed dimensions and border) in `Game.js`
- [X] Create Player component (`Player.js`) (Implemented within Game.js)
    - [X] Player representation (e.g., simple div or SVG)
    - [X] Player initial position
- [X] Implement Player movement (horizontal, limited vertical)
    - [X] Handle keyboard input (arrow keys) for movement
    - [X] Keep player within game boundaries
- [X] Implement Player shooting
    - [X] Handle keyboard input (e.g., Spacebar) for shooting
    - [X] Create Bullet component (`Bullet.js`) (Implemented within Game.js)
    - [X] Manage player bullets (creation, movement, removal)

## III. Enemies
- [X] Create Enemy component (`Enemy.js`) (Implemented within Game.js)
    - [X] Basic enemy representation
    - [X] Enemy initial spawning logic (e.g., from the right edge)
- [X] Implement basic Enemy movement (e.g., moving left across the screen)
- [X] Manage multiple enemies (creation, movement, removal)
- [ ] (Optional) Implement different enemy types with varied movement/shooting

## IV. Game Mechanics
- [X] Implement Collision Detection
    - [X] Player bullets vs. Enemies
    - [X] Player vs. Enemies
    - [ ] (Optional) Enemy bullets vs. Player
- [X] Scoring System
    - [X] Increment score on enemy hit
    - [X] Display score
- [X] Lives System
    - [X] Player loses a life on collision with enemy (or enemy bullet)
    - [X] Display lives
- [X] Game States
    - [X] Start Screen (e.g., "Press Start")
    - [X] Game Over Screen (display final score, option to restart)

## V. Styling & Enhancements
- [X] Basic retro styling for game elements (player, enemies, bullets) using CSS/Tailwind (Inline CSS used)
- [ ] (Optional) Sound effects for shooting, explosions
- [ ] (Optional) Levels or increasing difficulty

## VI. Testing & Deployment
- [X] Test game functionality thoroughly
    - [X] Player controls
    - [X] Shooting and hitting enemies
    - [X] Collision detection
    - [X] Score and lives update
    - [X] Game over and restart
- [X] Optimize performance
- [X] Prepare for deployment (build static files)
- [X] Deploy the game
- [X] Provide game link to user

