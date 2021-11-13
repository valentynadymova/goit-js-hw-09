// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysInput: document.querySelector('span[data-days]'),
  hoursInput: document.querySelector('span[data-hours]'),
  minutesInput: document.querySelector('span[data-minutes]'),
  secondsInput: document.querySelector('span[data-seconds]'),
};

refs.btnStart.addEventListener("click", timer);
refs.btnStart.setAttribute('disabled', true);

let startTime = 0;
let timerId = null;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        startTime = selectedDates[0];
      if (startTime < options.defaultDate) {
        //window.alert("Please choose a date in the future");
        Notify.failure("Please choose a date in the future");
      } else {
          refs.btnStart.removeAttribute("disabled");
      }
  },
};


const userInput = document.querySelector("#datetime-picker");
flatpickr(userInput, options);


function timer() {
    refs.btnStart.setAttribute("disabled", true);
     timerId = setInterval(() => {
        const currentTime = Date.now();
        const differenceTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(differenceTime);
       if (days < 0
         && hours < 0
         && minutes < 0
         && seconds < 0) {
             
        clearInterval(timerId);
        Notify.success("Your time is over");
        
       } else {
            updateTimer ({ days, hours, minutes, seconds })
            console.log({ days, hours, minutes, seconds })
    }
        
    }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysInput.textContent = `${days}`;
  refs.hoursInput.textContent = `${hours}`;
  refs.minutesInput.textContent = `${minutes}`;
  refs.secondsInput.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
