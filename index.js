const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// This function converts number to the 'xx' format.
// For example, if we have 5 seconds, it will return "05".
// @returns formatted time value. 
const formatTimeVal = (timeValue) => {
  if (timeValue < 10) {
    return `0${timeValue}`;
  }

  return timeValue.toString();
}

// This function splits seconds into hours, minutes and seconds.
// @returns Object with hours, minutes and seconds fields.
const formatSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return {
    hours: formatTimeVal(hours),
    minutes: formatTimeVal(minutes), 
    seconds: formatTimeVal(seconds),
  };
}

// This function displays the time remaining.
const showRemainingTime = (timeSeconds) => {
  const { hours, minutes, seconds } = formatSeconds(timeSeconds);

  timerEl.innerHTML = `<span>${hours}:${minutes}:${seconds}</span>`;
}

let curInterval = null;
const createTimerAnimator = () => {
  return (seconds) => {
    // If some interval was already started, stop it.
    if (curInterval) {
      clearInterval(curInterval);
      curInterval = null;
    }

    showRemainingTime(seconds);
    curInterval = setInterval(() => {
      if (seconds > 0) {
        seconds -= 1;

        showRemainingTime(seconds);
      } else {
        clearInterval(curInterval);
        curInterval = null;
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();
showRemainingTime(0);

inputEl.addEventListener('input', (e) => {
  let result = '';
  
  for (let i = 0; i < e.target.value.length; ++i) {
    if ((/\d/).test(e.target.value[i])) {
      result += e.target.value[i];
    }
  }

  e.target.value = result;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
