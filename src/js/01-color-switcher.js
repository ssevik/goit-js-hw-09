const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body')
}

let timer = null;
refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
  timer = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();

  }, 1000)
}

function onStopClick() {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timer);
  refs.stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}