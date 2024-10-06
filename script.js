const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreboard = document.getElementById("scoreboard");
const startMessage = document.getElementById("startMessage");
const gameContainer = document.getElementById("gameContainer");
const controls = document.getElementById("controls");
let score = 0;
let isJumping = false;

// Mostrar el mensaje de inicio
document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
    startMessage.style.display = "none"; // Ocultar mensaje de inicio
    gameContainer.style.display = "block"; // Mostrar el contenedor del juego
    controls.style.display = "flex"; // Mostrar controles
    score = 0; // Reiniciar puntuación
    scoreboard.innerText = ""; // Eliminar puntuación inicial
    obstacle.style.animation = "moveObstacle 2s linear infinite"; // Iniciar animación del obstáculo
}

// Mover el personaje
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowUp" && !isJumping) {
        jump();
    }
});

// Asignar botones de control para móviles
document.getElementById("leftBtn").addEventListener("click", moveLeft);
document.getElementById("rightBtn").addEventListener("click", moveRight);
document.getElementById("jumpBtn").addEventListener("click", function() {
    if (!isJumping) jump();
});

// Movimiento a la derecha
function moveRight() {
    const left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < window.innerWidth - 50) {
        character.style.left = left + 10 + "px";
    }
}

// Movimiento a la izquierda
function moveLeft() {
    const left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 10 + "px";
    }
}

// Saltar
function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);
            // Caer
            fall();
        } else {
            jumpHeight += 10;
            character.style.bottom = 20 + jumpHeight + "px";
        }
    }, 20);
}

// Caer
function fall() {
    const fallInterval = setInterval(() => {
        if (parseInt(character.style.bottom) <= 20) {
            clearInterval(fallInterval);
            isJumping = false;
            character.style.bottom = "20px";
            score += 10; // Incrementar puntuación al aterrizar
            scoreboard.innerText = `Puntuación: ${score}`;
            checkScore(); // Verificar puntuación
        } else {
            character.style.bottom = parseInt(character.style.bottom) - 10 + "px";
        }
    }, 20);
}

// Detección de colisiones
setInterval(() => {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        characterRect.x < obstacleRect.x + obstacleRect.width &&
        characterRect.x + characterRect.width > obstacleRect.x &&
        characterRect.y < obstacleRect.y + obstacleRect.height &&
        characterRect.height + characterRect.y > obstacleRect.y
    ) {
        alert("¡Colisión! JAJAJA JOSE LUIS TIENE MÁS PIERNAS 😜");
        location.reload(); // Reiniciar el juego
    }
}, 100);

// Comprobar la puntuación
function checkScore() {
    if (score >= 50) {
        alert("FELICIDADES, TIENES MÁS PIERNAS QUE JOSE LUIS(pipipi)");
        location.reload(); // Reiniciar el juego
    }
}
