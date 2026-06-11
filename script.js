const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let score = 0;
let time = 30;
let gameLoop;
let itemLoop;

let playerX = 380;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (e.key === "ArrowRight" && playerX < 760) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

function createItem() {
    const item = document.createElement("div");
    item.classList.add("item");

    const sustainable = Math.random() > 0.3;

    item.textContent = sustainable ? "🌽" : "🗑️";

    item.dataset.type = sustainable ? "good" : "bad";

    item.style.left = Math.random() * 760 + "px";
    item.style.top = "0px";

    game.appendChild(item);

    let posY = 0;

    const fall = setInterval(() => {
        posY += 4;
        item.style.top = posY + "px";

        const itemX = parseInt(item.style.left);

        if (
            posY > 390 &&
            itemX > playerX - 40 &&
            itemX < playerX + 40
        ) {
            if (item.dataset.type === "good") {
                score += 10;
            } else {
                score -= 5;
            }

            scoreDisplay.textContent = score;

            item.remove();
            clearInterval(fall);
        }

        if (posY > 500) {
            item.remove();
            clearInterval(fall);
        }
    }, 20);
}

function startGame() {
    score = 0;
    time = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    gameLoop = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(gameLoop);
            clearInterval(itemLoop);

            alert(
                `Fim de jogo!\nSua pontuação foi: ${score}\n\nQuanto mais recursos sustentáveis você coleta, mais forte fica o agro do futuro!`
            );
        }
    }, 1000);

    itemLoop = setInterval(createItem, 800);
}

startBtn.addEventListener("click", startGame);