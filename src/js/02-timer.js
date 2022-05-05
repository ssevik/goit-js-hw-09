import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

import "flatpickr/dist/flatpickr.min.css";

const timer = {
  buttonStart: document.querySelector('[data-start]'),
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      timer.buttonStart.disabled = true;
      Notiflix.Notify.failure('выберите дату в будущем');
    } else {
      timer.buttonStart.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

window.addEventListener('DOMContentLoaded', () => {
  timer.buttonStart.disabled = true;
});

timer.buttonStart.addEventListener('click', () => {
  timer.buttonStart.disabled = true;
  timer.inputDate.disabled = true;
  onStartTimer();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function onStartTimer() {
  const timer = setInterval(() => {
    const currentDate = Date.now();
    const deltaDate = selectedDate - currentDate;
    const time = convertMs(deltaDate);
    if (deltaDate < 1000) {
      clearInterval(timer);
      timer.inputDate.disabled = false;
    }
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  timer.days.textContent = addZero(days);
  timer.hours.textContent = addZero(hours);
  timer.minutes.textContent = addZero(minutes);
  timer.seconds.textContent = addZero(seconds);
}

function addZero(value) {
  return value.toString().padStart(2, '0');
}