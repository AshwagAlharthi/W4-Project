if (!localStorage.getItem('playerId')) {
    console.log('invalid login');
    window.location.href = "index.html";
}

if ((localStorage.getItem('timesUp'))) {
    localStorage.removeItem('timesUp')
}

let playerId = localStorage.getItem('playerId');
let interval;
let container = document.getElementById("image-container");
let beforeDisplay = document.getElementById("before-display");
let levelContainer = document.getElementById("level-container");
let content = document.getElementById("content");
let countDown = 3;
let levelText = document.createElement("h1");
let countText = document.createElement("h1");
let airplane = document.getElementById("airplane-image");
let clockTower = document.getElementById("clockTower-image");
let saudiFlag = document.getElementById("saudiFlag-image");
let almasmak = document.getElementById("almasmak-image");
let almamlakah = document.getElementById("almamlakah-image");
let palm = document.getElementById("palm-image");
let score = document.getElementById("score");
let countScore = 0;
let clicks = {
    'airplane': 0,
    'clockTower': 0,
    'saudiFlag': 0,
    'almasmak': 0,
    'almamlakah': 0,
    'palm': 0,
};

levelContainer.appendChild(levelText);
levelContainer.appendChild(countText);

levelText.textContent = "المستوى الأول";
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

countingScore(airplane, 'airplane');
countingScore(clockTower, 'clockTower');
countingScore(saudiFlag, 'saudiFlag');
countingScore(almasmak, 'almasmak');
countingScore(almamlakah, 'almamlakah');
countingScore(palm, 'palm');

function timer() {
    let timer = document.getElementById("timer");
    if (!interval) {
        let sec = 30;
        interval = setInterval(function () {
            timer.textContent = sec;
            sec--;

            if (sec == 19) {
                timer.style.color = 'orange';
            }

            if (sec == 9) {
                timer.style.color = 'red';
            }

            if (sec < 0 || countScore == 6) {
                clearInterval(interval);
                interval = null;

                fetch(`https://66eda70e380821644cdd9b53.mockapi.io/login/${playerId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        score: countScore,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        window.location.href = "game2.html"
                    });
            }
        }, 1000);
    }
};