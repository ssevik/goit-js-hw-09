import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', submint);

function submint(evt) {
  evt.preventDefault();
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  const dataForm = {
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  };

  for (let i = 1; i <= dataForm.amount; i += 1) {
    createPromise(i, dataForm.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    dataForm.delay += dataForm.step;
  }

  return dataForm;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
