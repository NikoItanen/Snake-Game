// The size of each cell in the grid, in pixels
const cellSize = 20;

// The width and height of the game grid, in cells
const gridWidth = 20;
const gridHeight = 20;

// The direction that the snake is moving
// 0 = up, 1 = right, 2 = down, 3 = left
let snakeDirection = 1;

// The current position of the snake's head
let snakeHeadX = 10;
let snakeHeadY = 10;

// The positions of the snake's body segments
let snakeBody = [[10, 10]];

// The position of the food
let foodX = 15;
let foodY = 15;

// The canvas element and the 2D rendering context
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// The interval ID for the game loop
let gameInterval = null;

// Whether the game is currently running or not
let gameRunning = false;

function gameLoop() {
    // Update the game state
    update();
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the game
    draw();
  }

  function update() {
    // Check if the snake has run into the wall or itself
    if (snakeHeadX < 0 || snakeHeadX >= gridWidth || snakeHeadY < 0 || snakeHeadY >= gridHeight || snakeBody.some(segment => segment[0] == snakeHeadX && segment[1] == snakeHeadY)) {
      // If the snake has run into a wall or itself, stop the game
      stopGame();
    }
  
    // Check if the snake has eaten the food
    if (snakeHeadX == foodX && snakeHeadY == foodY) {
      // If the snake has eaten the food, add a new body segment to the snake
      snakeBody.unshift([snakeHeadX, snakeHeadY]);
  
      // Generate a new food position
      foodX = Math.floor(Math.random() * gridWidth);
      foodY = Math.floor(Math.random() * gridHeight);
    } else {
      // If the snake hasn't eaten the food, move the snake by removing the tail segment and adding a new head segment
      snakeBody.pop();
      snakeBody.unshift([snakeHeadX, snakeHeadY]);
    }
  }