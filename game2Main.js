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
levelContainer.appendChild(levelText);
levelContainer.appendChild(countText);


levelText.textContent = "المستوى الثاني";
countText.textContent = countDown;

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
        var sec = 60;
        interval = setInterval(function() {
          timer.innerHTML = sec;
          sec--;
      
        //   if (sec == 0) {
        //     alert("Time's up!");
        //     interval = null;
        //   }

        if(sec == 29){
            timer.style.color = 'orange';
        }

        if(sec == 14){
            timer.style.color = 'red';
        }
        

        if (sec < 0 || countScore == 6) { 
            clearInterval(interval);
            interval = null;
            if(sec < 0){
                localStorage.setItem('timesUp', true);
            }

            window.location.href = "resutl.html";
            
            localStorage.setItem('secondScore', countScore);

            // alert("Time's up!");
//             container.innerHTML = '';
//             // 
//             let div = document.createElement("div");
//             let timeoutText = document.createElement("h1");
//             let winText = document.createElement("h2");
//             let scoreText = document.createElement("h2");

//             div.classList.add("timeout-div");

            
//             if(countScore == 6){
//                 timeoutText.textContent = "مبروووووك";
//             }else{
//                 timeoutText.textContent = "انتهى الوقت";
//             }
            

//             // timeoutText.textContent = "انتهى الوقت";

//             let finalScore = countScore + Number(localStorage.getItem('firstScore'));

//             if(finalScore >= 6){
//             winText.textContent = "لقد فزت يا " + localStorage.getItem('playerId') + " !"
//             }else{
//             winText.textContent = "حظ أوفر يا " + localStorage.getItem('playerId') + " !"
//             };
            
            
//             scoreText.textContent = `درجتك: ${finalScore} / 12`; //12
//             div.appendChild(timeoutText);
//             div.appendChild(winText);
//             div.appendChild(scoreText);
//             container.appendChild(div);
//             // 
        }
        }, 1000);
    }
  };

// 
let camel = document.getElementById("camel-image");
let dallah = document.getElementById("dallah-image");
let princess = document.getElementById("princess-image");
let sword = document.getElementById("sword-image");
let saudiLogo = document.getElementById("saudiLogo-image");
let saudiFlag2 = document.getElementById("saudiFlag2-image");
let score = document.getElementById("score");
let countScore = 0;
let clicks = {
    'camel' : 0,
    'dallah': 0,
    'princess': 0,
    'sword': 0,
    'saudiLogo': 0,
    'saudiFlag2': 0,
};


function countingScore(element, elementClicks) {
    element.addEventListener("click", () => {
        if(clicks[elementClicks] == 0){
            console.log(clicks[elementClicks]);
        
            clicks[elementClicks] = 1;
            countScore += 1;
            // let className = '\''+element+'\'';
            // console.log(`${elementClicks}-checked`);
            
            // element.classList.add(`${elementClicks}-checked`);
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