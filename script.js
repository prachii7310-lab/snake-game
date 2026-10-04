const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;
let game;

// Listen for keyboard input
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
}

function drawGame() {

    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "#00ff00" : "#4CAF50";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    // Draw food
    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );

    // Current head
    let headX = snake[0].x;
    let headY = snake[0].y;

    // Move the snake
    if (direction === "UP") {
        headY -= box;
    }

    if (direction === "DOWN") {
        headY += box;
    }

    if (direction === "LEFT") {
        headX -= box;
    }

    if (direction === "RIGHT") {
        headX += box;
    }

    // New head
    let newHead = {
        x: headX,
        y: headY
    };

    // Check wall collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height
    ) {
        endGame();
        return;
    }

    // Check collision with itself
    for (let i = 0; i < snake.length; i++) {

        if (
            headX === snake[i].x &&
            headY === snake[i].y
        ) {
            endGame();
            return;
        }
    }

    // Add new head
    snake.unshift(newHead);

    // Check if snake ate food
    if (
        headX === food.x &&
        headY === food.y
    ) {

        score++;

        document.getElementById("score").innerText =
            "Score: " + score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {

        // Remove tail
        snake.pop();
    }
}

function endGame() {

    clearInterval(game);

    alert("Game Over! Your score was " + score);
}

function restartGame() {

    clearInterval(game);

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    direction = "RIGHT";
    score = 0;

    document.getElementById("score").innerText =
        "Score: 0";

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    game = setInterval(drawGame, 120);
}

// Start game
game = setInterval(drawGame, 120);
