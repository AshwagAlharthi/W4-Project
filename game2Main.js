if (!localStorage.getItem('playerId')) {
    console.log('invalid login');
    window.location.href = "index.html";
}

if ((localStorage.getItem('timesUp'))) {
    localStorage.removeItem('timesUp')
}

let playerId = localStorage.getItem('playerId');
let firstScore;
let finalScore;
let interval;
let container = document.getElementById("image-container");
let beforeDisplay = document.getElementById("before-display");
let levelContainer = document.getElementById("level-container");
let content = document.getElementById("content");
let countDown = 3;
let levelText = document.createElement("h1");
let countText = document.createElement("h1");
let camel = document.getElementById("camel-image");
let dallah = document.getElementById("dallah-image");
let princess = document.getElementById("princess-image");
let sword = document.getElementById("sword-image");
let saudiLogo = document.getElementById("saudiLogo-image");
let saudiFlag2 = document.getElementById("saudiFlag2-image");
let score = document.getElementById("score");
let countScore = 0;
let clicks = {
    'camel': 0,
    'dallah': 0,
    'princess': 0,
    'sword': 0,
    'saudiLogo': 0,
    'saudiFlag2': 0,
};

levelContainer.appendChild(levelText);
levelContainer.appendChild(countText);

levelText.textContent = "المستوى الثاني";
countText.textContent = countDown;

let displayInterval = setInterval(() => {
    if (countDown > 0) {
        countText.textContent = countDown;
        countDown--;
    } else {
        clearInterval(displayInterval);
        beforeDisplay.style.display = 'none';
        content.style.display = 'block';
        timer();
    }
}, 1000);

function countingScore(element, elementClicks) {
    element.addEventListener("click", () => {
        if (clicks[elementClicks] == 0) {
            clicks[elementClicks] = 1;
            countScore += 1;
            element.style.borderColor = '#2e7950';
            score.textContent = `${countScore} / 6`
        }
    })
}

countingScore(camel, 'camel');
countingScore(dallah, 'dallah');
countingScore(princess, 'princess');
countingScore(sword, 'sword');
countingScore(saudiLogo, 'saudiLogo');
countingScore(saudiFlag2, 'saudiFlag2');

function timer() {
    let timer = document.getElementById("timer");
    if (!interval) {
        let sec = 60;
        interval = setInterval(function () {
            timer.textContent = sec;
            sec--;

            if (sec == 29) {
                timer.style.color = 'orange';
            }

            if (sec == 14) {
                timer.style.color = 'red';
            }

            if (sec < 0 || countScore == 6) {
                clearInterval(interval);
                interval = null;

                if (sec < 0) {
                    localStorage.setItem('timesUp', true);
                }

                fetchAndUpdateScore();
            }
        }, 1000);
    }
};

function fetchAndUpdateScore() {
    fetch('https://66eda70e380821644cdd9b53.mockapi.io/login')
    .then((response) => response.json())
    .then((data) => {
        let gamePlayer = data.find(player => player.id == playerId);

        if (gamePlayer) {
            firstScore = gamePlayer.score;
            
            finalScore = firstScore + countScore;

                fetch(`https://66eda70e380821644cdd9b53.mockapi.io/login/${playerId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        score: finalScore,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        window.location.href = "result.html";
                    });
        } else {
            console.log('The player not found!');
            return;
        }
    });  
};