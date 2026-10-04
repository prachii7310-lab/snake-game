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

// Special food
let specialFood = null;
let normalFoodCount = 0;
let specialFoodTimer = null;

let direction = "RIGHT";
let score = 0;
let highScore = 0;
let game;


// Listen for keyboard input
document.addEventListener("keydown", changeDirection);


// Change direction
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


// Create special food
function createSpecialFood() {

    specialFood = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    // Special food disappears after 5 seconds
    specialFoodTimer = setTimeout(() => {
        specialFood = null;
    }, 5000);
}


// Draw game
function drawGame() {

    // Clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle =
            i === 0
                ? "#00ff88"
                : "#00aa66";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }


    // Draw normal food
    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );


    // Draw special food
    if (specialFood !== null) {

        ctx.fillStyle = "gold";

        ctx.beginPath();

        ctx.arc(
            specialFood.x + box / 2,
            specialFood.y + box / 2,
            box / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Add a white center
        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(
            specialFood.x + box / 2,
            specialFood.y + box / 2,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    // Current head
    let headX = snake[0].x;
    let headY = snake[0].y;


    // Move snake
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


    // Create new head
    let newHead = {
        x: headX,
        y: headY
    };


    // Wall collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height
    ) {

        endGame();
        return;
    }


    // Snake collision
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


    // Check normal food
    if (
        headX === food.x &&
        headY === food.y
    ) {

        score++;

        normalFoodCount++;

        // Update high score
        if (score > highScore) {
            highScore = score;
        }

        updateScore();


        // Create new normal food
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };


        // Special food appears every 5 normal foods
        if (
            normalFoodCount % 5 === 0 &&
            specialFood === null
        ) {

            createSpecialFood();
        }

    } else {

        // Check special food
        if (
            specialFood !== null &&
            headX === specialFood.x &&
            headY === specialFood.y
        ) {

            // Special food gives 5 points
            score += 5;

            if (score > highScore) {
                highScore = score;
            }

            updateScore();

            // Remove special food
            specialFood = null;

            clearTimeout(specialFoodTimer);

        } else {

            // Normal movement
            snake.pop();
        }
    }
}


// Update score display
function updateScore() {

    document.getElementById("score").innerText =
        "Score: " + score;

    document.getElementById("highScore").innerText =
        "High Score: " + highScore;
}


// Game over
function endGame() {

    clearInterval(game);

    clearTimeout(specialFoodTimer);

    alert(
        "Game Over! Your score was " + score
    );
}


// Restart game
function restartGame() {

    clearInterval(game);

    clearTimeout(specialFoodTimer);

    snake = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];

    direction = "RIGHT";

    score = 0;

    normalFoodCount = 0;

    specialFood = null;

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
