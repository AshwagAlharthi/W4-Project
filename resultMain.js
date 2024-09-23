if (!localStorage.getItem('playerId')) {
    console.log('invalid login');
    window.location.href = "index.html";
}

let timesUp;
if (localStorage.getItem('timesUp')) {
    timesUp = localStorage.getItem('timesUp');
}

let lastScore;
let playerName;
let playerId = localStorage.getItem('playerId');
let content = document.getElementById("content-container");
let container = document.getElementById("result-container");
let timeoutText = document.getElementById("timeoutText");
let winText = document.getElementById("winText");
let scoreText = document.getElementById("scoreText");
let tryButton = document.createElement("button");

tryButton.classList.add("btn");
tryButton.textContent = "حاول مرة أخرى";

if (!timesUp) {
    timeoutText.textContent = "مبروووووك";
} else {
    timeoutText.textContent = "انتهى الوقت";
}

fetch('https://66eda70e380821644cdd9b53.mockapi.io/login')
    .then((response) => response.json())
    .then((data) => {
        let gamePlayer = data.find(player => player.id == playerId);

        if (gamePlayer) {
            lastScore = gamePlayer.score;
            playerName = gamePlayer.name;
            getScore(lastScore, playerName);
        } else {
            console.log('The player not found!');
            return;
        }
    });

function getScore(score, name) {
    if (score >= 6) {
        winText.textContent = `لقد فزت يا ${name} !`;
        container.style.backgroundImage = "url('https://i.pinimg.com/originals/35/76/f1/3576f1df24e20af5bc43777b9a5ddc98.gif')";
        container.style.backgroundSize = 'cover';
    } else {
        winText.textContent = `حظ أوفر يا ${name} !`;
        winText.style.color = "red";
        content.appendChild(tryButton);

        tryButton.addEventListener("click", () => {
            window.location.href = "game.html";
            localStorage.removeItem('timesUp');
        })
    };

    scoreText.textContent = `درجتك: ${score} / 12`;
}