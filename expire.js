let timer = null;
function startCountdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;
    function updateCountdown() {
        let diff = expireTime - Date.now();
        if (diff <= 0) {
            clearInterval(timer);
            lock();
            return;
        }
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        diff %= (1000 * 60 * 60 * 24 * 365);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff %= (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff %= (1000 * 60);
        const seconds = Math.floor(diff / 1000);
        countdownEl.textContent =
            `${String(years).padStart(2, "0")}Y ` +
            `${String(days).padStart(2, "0")}D ` +
            `${String(hours).padStart(2, "0")}H ` +
            `${String(minutes).padStart(2, "0")}M ` +
            `${String(seconds).padStart(2, "0")}S`;
    }
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
}