import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const delayinputRef = document.querySelector('input[name="delay"]')
const stepinputRef = document.querySelector('input[name="step"]')
const amountinputRef = document.querySelector('input[name="amount"]')

formRef.addEventListener('submit', OnFormSubmit)

function OnFormSubmit(event) {
  event.preventDefault();

  const delay = +delayinputRef.value;
  const step = +stepinputRef.value;
  const amount = +amountinputRef.value;

  for (let i = 0; i < amount; i++) {
    const delayStep = +(delay + step - (i - 1));
  
  createPromise(i,delayStep).then(OnSuccess).catch(OnError)
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position,delay})
  }  
  }, delay)
  })
  return promise
  }


function OnSuccess({position,delay}) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
};

function OnError({position,delay}) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
}
