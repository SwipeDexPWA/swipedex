let license = null;
let expireTime = null;
let redirectURL = null;
async function checkLicense() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
        console.log("License data:", data);
        if (!data.license) {
            console.warn("No license data found. Allowing app.");
            showApp();
            return;
        }
        license = data.license;
        expireTime = new Date(
            license.expires
        ).getTime();
        redirectURL = license.redirect;
        if (license.disabled) {
            lock();
            return;
        }
        if (Date.now() >= expireTime) {
            lock();
            return;
        }
        showApp();
        if (typeof startCountdown === "function") {
            startCountdown();
        }
    } catch (error) {
        console.warn(
            "Offline mode - skipping license check",
            error
        );
        showApp();
    }
}
function showApp() {
    const app =
        document.getElementById("pwa");
    if (app) {
        app.style.display = "block";
    }
}
function lock() {
    const app =
        document.getElementById("pwa");
    if (app) {
        app.style.display = "none";
    }
    if (typeof UIkit !== "undefined") {
        UIkit.modal("#license").show();
    }
    const btn =
        document.getElementById("provider");
    if (btn) {
        btn.onclick = () => {
            window.location.href =
                redirectURL;
        };
    }
}
checkLicense();