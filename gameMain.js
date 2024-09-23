if (!localStorage.getItem('playerId')) {
    console.log('invalid login');
    window.location.href = "index.html";
}

let container = document.getElementById("image-container");
let beforeDisplay = document.getElementById("before-display");
let levelContainer = document.getElementById("level-container");
let content = document.getElementById("content");

let countDown = 3;

let levelText = document.createElement("h1");
let countText = document.createElement("h1");
// let bgImage = document.createElement("img");
levelContainer.appendChild(levelText);
levelContainer.appendChild(countText);
// levelContainer.appendChild(bgImage);

levelText.textContent = "المستوى الأول";
countText.textContent = countDown;
// bgImage.src = "./map.png";

let displyInterval = setInterval(() => {
    if(countDown > 0){
        countText.textContent = countDown;
        countDown--;
    }else{
        clearInterval(displyInterval);
        beforeDisplay.style.display = 'none';
        content.style.display = 'block';
        timer();
    }
}, 1000);


let interval;

// window.onload = 
function timer() {
    let timer = document.getElementById("timer");
    if(!interval){
        var sec = 30;
        interval = setInterval(function() {
          timer.innerHTML = sec;
          sec--;
      
        //   if (sec == 0) {
        //     alert("Time's up!");
        //     interval = null;
        //   }

        if(sec == 19){
            timer.style.color = 'orange';
        }

        if(sec == 9){
            timer.style.color = 'red';
        }
        

        if (sec < 0 || countScore == 6) { 
            clearInterval(interval);
            interval = null;
            window.location.href = "game2.html"
            localStorage.setItem('firstScore', countScore);
            // alert("Time's up!");
            // container.innerHTML = '';
            // 
            // let div = document.createElement("div");
            // let text = document.createElement("h1");
            // let nextLevelText = document.createElement("h2");
            // let scoreText = document.createElement("h2");

            // div.classList.add("timeout-div");
            // text.textContent = "إلى المستوى التالي";
            // nextLevelText.textContent = "إلى المستوى التالي";
            // if(countScore >= 3){
            // winText.textContent = " مبروووك !";
            // }else{
            // winText.textContent = " حظ أوفر !";
            // };
            // scoreText.textContent = `درجتك: ${countScore} / 6`;
            // div.appendChild(text);
            // div.appendChild(winText);
            // div.appendChild(scoreText);
            // container.appendChild(div);
            // 
        }
        }, 1000);
    }
  };

// 
let airplane = document.getElementById("airplane-image");
let clockTower = document.getElementById("clockTower-image");
let saudiFlag = document.getElementById("saudiFlag-image");
let almasmak = document.getElementById("almasmak-image");
let almamlakah = document.getElementById("almamlakah-image");
let palm = document.getElementById("palm-image");
let score = document.getElementById("score");
let countScore = 0;
let clicks = {
    'airplane' : 0,
    'clockTower': 0,
    'saudiFlag': 0,
    'almasmak': 0,
    'almamlakah': 0,
    'palm': 0,
};

// if (!localStorage.getItem('playerId')) {
//     console.log('invalid login');
//     return;
// }

function countingScore(element, elementClicks) {
    element.addEventListener("click", () => {
        if(clicks[elementClicks] == 0){
            console.log(clicks[elementClicks]);
        
            clicks[elementClicks] = 1;
            countScore += 1;
            // let className = '\''+element+'\'';
            // console.log(`${elementClicks}-checked`);
            
            // element.classList.add('image-checked');
            // element.classList.add(`${elementClicks}-checked`);
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


// airplane.addEventListener("click", () => {
//     if(clicks['airplaneClicks'] == 0){
//         console.log(clicks['airplaneClicks']);
    
//         clicks['airplaneClicks'] = 1;
//         countScore += 1;
//         score.textContent = `${countScore} / 6`
//     }
// })