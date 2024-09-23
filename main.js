if ((localStorage.getItem('playerId'))) {
  localStorage.removeItem('playerId')
}

if ((localStorage.getItem('timesUp'))) {
  localStorage.removeItem('timesUp')
}

let nameInput = document.getElementById("name");
let startButton = document.getElementById("startButton");
let alertP = document.getElementById("alertP");

alertP.style.color = 'red';

startButton.addEventListener("click", () => {
  let nameInputValue = nameInput.value;
  if (nameInputValue == '') {
    alertP.textContent = 'أدخل اسمك لتبدأ اللعبة!';
    return;
  }

  fetch('https://66eda70e380821644cdd9b53.mockapi.io/login')
    .then((response) => response.json())
    .then((data) => {
      let checkPlayer = data.some(player => player.name == nameInputValue)
      if (checkPlayer) {
        alertP.textContent = 'الاسم موجود بالفعل!';
        return;
      }
      else {
        fetch('https://66eda70e380821644cdd9b53.mockapi.io/login', {
          method: 'POST',
          body: JSON.stringify({
            name: nameInputValue,
            score: 0,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem('playerId', data.id);
            window.location.href = "game.html";
          });
      }
    });
})