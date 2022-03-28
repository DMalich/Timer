const settingsButton = document.querySelector(".settings");
const startButton = document.querySelector(".start");
const seconds = document.querySelector(".seconds > input[type = text]");
const minutes = document.querySelector(".minutes > input[type = text]");
const ring = document.querySelector(".ring");
let startTime = 0;
let timer = null;
let running = false;
let originalMinutes = 0;
let originalSeconds = 0;
let totalSeconds;

startButton.addEventListener("click", function () {
    if (!running) {
        startTimer();
    } else if (running) {
        pauseTimer();
    }
});

settingsButton.addEventListener("click", function () {
    if (running) {
        pauseTimer();
    }
    seconds.disabled = false;
    minutes.disabled = false;
});

function validateTimeInput(e) {
    const validatedInput = e.target.value
        .replace(/[^0-9]/g, "")
        .substring(0, 2);
    e.target.value = validatedInput;
}

minutes.addEventListener("keyup", validateTimeInput);
seconds.addEventListener("keyup", validateTimeInput);

function startTimer() {
    running = true;
    startButton.innerText = "Pause";
    startTime = Date.now();
    const secondsValue = parseInt(seconds.value);
    const minutesValue = parseInt(minutes.value);
    totalSeconds = secondsValue + minutesValue * 60;
    timer = setInterval(function () {
        const currentTime = Date.now();
        const diff = currentTime - startTime;
        const secondsLeft = totalSeconds - Math.floor(diff / 1000);
        const minutesLeft = Math.floor(secondsLeft / 60);
        seconds.value = padNumber(secondsLeft % 60);
        minutes.value = padNumber(minutesLeft);

        if (secondsLeft === 0 && minutesLeft === 0) {
            finishTimer();
        }
    }, 1000);
}

function pauseTimer() {
    running = false;
    startButton.innerText = "Start";
    clearInterval(timer);
}

function finishTimer() {
    clearInterval(timer);
    ring.classList.add("ending");
    clearInterval(timer);
    setTimeout(function () {
        alert("Time's up!");
        resetTimer();
    }, 0);
}

function resetTimer() {
    clearInterval(timer);
    seconds.value = originalSeconds;
    minutes.value = originalMinutes;
    startButton.innerText = "Start";
    ring.classList.remove("ending");
    running = false;
}

function padNumber(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function setOriginalTime() {
    originalMinutes = padNumber(parseInt(minutes.value));
    originalSeconds = padNumber(parseInt(seconds.value));
}

setOriginalTime();
resetTimer();

