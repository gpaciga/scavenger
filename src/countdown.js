const countdown = (minutes, seconds) => {

    const durationMs = (minutes*60 + seconds)*1000;
    const start = new Date().getTime();
    const end = start + durationMs;

    setDisplay(minutes, seconds, 100);

    const counter = setInterval(() => {
        const now = new Date().getTime();
        const remainingMs = end - now;
        const remainingPercent = Math.floor((remainingMs / durationMs) * 100);
        const minutes = Math.floor(remainingMs / 1000 / 60);
        const seconds = Math.floor(remainingMs / 1000 - minutes * 60);
        setDisplay(minutes, seconds, remainingPercent);

        if (remainingMs <= 0) {
            clearInterval(counter);
            stopDisplay();
        }
    }, 1000);
};

const setDisplay = (minutes, seconds, percent) => {

    const elapsedPercent = 100 - percent;
    const progressClass = percent < 10 ? "bg-danger" : "bg-success";

    const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;

    $("#countdown").html(`
        <p>${minutes}m ${ss}s<p>
        <div class="progress">
            <div class="progress-bar bg-secondary" role="progressbar" style="width: ${elapsedPercent}%" aria-valuenow="${elapsedPercent}" aria-valuemin="0" aria-valuemax="100"></div>
            <div class="progress-bar ${progressClass}" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    `);
}

const stopDisplay = () => {
    $("#countdown").html(`
        <div class="alert alert-danger" role="alert">
            Time's up!
        </div>
    `);
}

module.exports = countdown;
