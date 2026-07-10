let license = null;
let expireTime = null;
let redirectURL = null;
fetch("data.json")
    .then(r => r.json())
    .then(data => {

    console.log("DATA:", data);

    if (!data.license) {
        console.error("No license object!");
        document.getElementById("pwa").style.display = "block";
        return;
    }

    license = data.license;)
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
