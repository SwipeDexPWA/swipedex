let license = null;
let expireTime = null;
let redirectURL = null;
fetch("data.json")
fetch(`data.json?v=${Date.now()}`, {
    cache: "no-store"
})
    .then(r => r.json())
    .then(data => {
        license = data.license;
        expireTime = new Date(license.expires).getTime();
        redirectURL = license.redirect;
        if (license.disabled) {
            lock();
            return;
        }
        if (Date.now() >= expireTime) {
            lock();
            return;
        }
        const app = document.getElementById("pwa");
        if (app) app.style.display = "block";
        startCountdown();
    })
    .catch(err => {
        console.error("License error:", err);
    });
function lock() {
    const app = document.getElementById("pwa");
    if (app) app.style.display = "none";
    UIkit.modal("#license").show();
    const btn = document.getElementById("provider");
    if (btn) {
        btn.onclick = () => {
            window.location.href = redirectURL;
        };
    }
}