import '../css/common.css';

const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
btnStartRef.style.padding = '10px 20px';
btnStopRef.style.padding = '10px 20px';
btnStopRef.style.fontSize = '20px';
btnStartRef.style.fontSize = '20px';

btnStartRef.addEventListener('click',  OnStartClick);
btnStopRef.addEventListener('click', OnStopClick)

let timeoutId = null

function OnStartClick() {
    if (OnStartClick) {
        btnStartRef.setAttribute('disabled', true);
    }
     btnStopRef.removeAttribute('disabled');
    timeoutId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);     
}

function OnStopClick() {
    if (OnStopClick) {
        btnStopRef.setAttribute('disabled', true);
    };
    btnStartRef.removeAttribute('disabled');
    clearInterval(timeoutId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}