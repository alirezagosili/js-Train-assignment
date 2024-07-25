const beginTimer = () => {
    const now = dayjs();
    const dayName = now.format('dddd');
    const minutes = now.minute();
    const seconds = now.second();

    const weekendInterval = 10;

    const weekdayInterval = 5;

    let interval;
    let noticeMessage;

    if (now.day() === 6 || now.day() === 0) {
        interval = weekendInterval;
        noticeMessage = "The Train departs every 10 minutes because today is a holiday.";
    } else {
        interval = weekdayInterval;
        noticeMessage = "The Train departs every 5 minutes because today is a weekday.";
    }

    const noticeElement = document.getElementById('notice');
    noticeElement.innerText = noticeMessage;

    const dayElement = document.getElementById('day');
    dayElement.innerText = `Today is ${dayName}.`;

    const minutesToNextTrain = interval - (minutes % interval) - 1;
    const secondsToNextTrain = 60 - seconds;

    let adjustedMinutes;
    let adjustedSeconds;

    if (secondsToNextTrain === 60) {
        adjustedMinutes = minutesToNextTrain + 1;
        adjustedSeconds = 0;
    } else {
        adjustedMinutes = minutesToNextTrain;
        adjustedSeconds = secondsToNextTrain;
    }

    startTimer(adjustedMinutes, adjustedSeconds);

    const startButton = document.getElementById('checkTimeBtn');
    startButton.disabled = true;
};

const startTimer = (minutes, seconds) => {
    const timeRemainingElement = document.getElementById("timeRemaining");

    const updateTimer = () => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                alert("Train arrived!");
                
                const startButton = document.getElementById('checkTimeBtn');
                startButton.disabled = false;
                return;
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }

        timeRemainingElement.innerText = `Next Train in ${minutes} minutes and ${seconds} seconds.`;
    };

    updateTimer(); 
    const timerInterval = setInterval(updateTimer, 1000);
};
