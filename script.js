document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('timer-display');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');
    const restartButton = document.getElementById('restart-button');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    let countdown;
    let timeLeft; // Time left in seconds
    let initialTime; // Initial time in seconds

    function updateDisplay() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        display.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        countdown = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert('Time is up!');
            }
        }, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = false;
        restartButton.disabled = false;
    }

    function stopTimer() {
        clearInterval(countdown);
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    function resetTimer() {
        clearInterval(countdown);
        timeLeft = initialTime;
        updateDisplay();
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = true;
        restartButton.disabled = true;
    }

    function restartTimer() {
        clearInterval(countdown);
        timeLeft = initialTime;
        updateDisplay();
        startTimer();
    }

    function setInitialTime() {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        initialTime = timeLeft = (hours * 3600) + (minutes * 60) + seconds;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    restartButton.addEventListener('click', restartTimer);
    hoursInput.addEventListener('change', setInitialTime);
    minutesInput.addEventListener('change', setInitialTime);
    secondsInput.addEventListener('change', setInitialTime);

    setInitialTime();
    stopButton.disabled = true;
    resetButton.disabled = true;
    restartButton.disabled = true;
});
