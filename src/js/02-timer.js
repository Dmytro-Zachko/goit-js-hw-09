import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';


const btnStartRef = document.querySelector('button');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnStartRef.disabled = true;
let selectedTime = 0;

btnStartRef.addEventListener('click', onStartClick)

flatpickr("#datetime-picker", {
 enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime = selectedDates[0];
   if (selectedTime < new Date()) {
       btnStartRef.disabled = true;
       Notify.failure("Please choose a date in the future");
   } else {
       btnStartRef.disabled = false;
      Notify.success("it's time to press start");
        }
        selectedTime = selectedDates[0].getTime()
    },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
};

function ChangeTimerInterface({ days, hours, minutes, seconds }) {
    daysRef.textContent = `${days}`;
    hoursRef.textcontent = `${hours}`;
    minutesRef.textContent = `${minutes}`;
    secondsRef.textContent = `${seconds}`;
}

function onStartClick() {
  const intervalId = setInterval(() => {
     let Deltatime = selectedTime - Date.now();
      btnStartRef.disabled = true;
       if (Deltatime < 1000) {
      clearInterval(intervalId);
   Report.success('Time is up')
       }
    console.log(convertMs(Deltatime));
    ChangeTimerInterface(convertMs(Deltatime));
  }, 1000);
}