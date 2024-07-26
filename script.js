let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    running = false;
    startStopButton.textContent = 'Start';
    elapsedTime = 0;
    lapTimes = [];
    updateDisplay();
    updateLaps();
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = elapsedTime + (Date.now() - startTime);
        lapTimes.push(lapTime);
        updateLaps();
    }
});

function updateDisplay() {
    const time = elapsedTime + (running ? Date.now() - startTime : 0);
    display.textContent = formatTime(time);
}

function updateLaps() {
    lapsList.innerHTML = '';
    lapTimes.forEach((lapTime, index) => {
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapElement);
    });
}

function formatTime(time) {
    const milliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}:${milliseconds}`;
}
