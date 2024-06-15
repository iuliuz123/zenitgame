const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const player = {
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    speed: 5
};

const letters = [
    { x: 100, y: 100, value: 'Z' },
    { x: 200, y: 200, value: 'E' },
    { x: 300, y: 300, value: 'N' },
    { x: 400, y: 400, value: 'I' },
    { x: 500, y: 500, value: 'T' }
];

let collectedLetters = [];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawLetters() {
    letters.forEach(letter => {
        if (!collectedLetters.includes(letter.value)) {
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText(letter.value, letter.x, letter.y);
        }
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawLetters();
    checkCollisions();
    requestAnimationFrame(update);
}

function checkCollisions() {
    letters.forEach(letter => {
        if (
            player.x < letter.x + 20 &&
            player.x + player.width > letter.x &&
            player.y < letter.y + 20 &&
            player.y + player.height > letter.y
        ) {
            if (!collectedLetters.includes(letter.value)) {
                collectedLetters.push(letter.value);
            }
        }
    });

    if (collectedLetters.length === letters.length) {
        document.getElementById('winMessage').classList.remove('hidden');
    }
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }
});

update();
