if (!localStorage.getItem('playerId')) {
    console.log('invalid login');
    window.location.href = "index.html";
}

let timesUp;
if (localStorage.getItem('timesUp')) {
    timesUp = localStorage.getItem('timesUp');
}

let playerId = localStorage.getItem('playerId');
let playerName = localStorage.getItem('playerName');
let level1Score = Number(localStorage.getItem('firstScore'));
let level2Score = Number(localStorage.getItem('secondScore'));
let finalScore = level1Score + level2Score;

let content = document.getElementById("content-container");
let container = document.getElementById("result-container");
let timeoutText = document.getElementById("timeoutText");
let winText = document.getElementById("winText");
let scoreText = document.getElementById("scoreText");

let tryButton = document.createElement("button");
tryButton.classList.add("btn");
tryButton.textContent = "حاول مرة أخرى";

// container.classList.add("timeout-div");

if (!timesUp) {
    timeoutText.textContent = "مبروووووك";
} else {
    timeoutText.textContent = "انتهى الوقت";
}

if (finalScore >= 6) {
    winText.textContent = `لقد فزت يا ${playerName} !`;
    container.style.backgroundImage = "url('https://i.pinimg.com/originals/35/76/f1/3576f1df24e20af5bc43777b9a5ddc98.gif')";
    container.style.backgroundSize = 'cover';
} else {
    winText.textContent = `حظ أوفر يا ${playerName} !`;
    winText.style.color = "red";
    content.appendChild(tryButton);
    localStorage.removeItem('firstScore');
    localStorage.removeItem('secondScore');

    tryButton.addEventListener("click", () => {
        window.location.href = "game.html";
    })
};

scoreText.textContent = `درجتك: ${finalScore} / 12`;

fetch(`https://66eda70e380821644cdd9b53.mockapi.io/login/${playerId}`, {
    method: 'PUT',
    body: JSON.stringify({
        score: finalScore,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json());
