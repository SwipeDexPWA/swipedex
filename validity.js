let license = null;
let expireTime = null;
let redirectURL = null;

fetch("data.json")
    .then(r => r.json())
    .then(data => {

        console.log("DATA:", data);

        if (!data.license) {
            console.error("No license object!");

            const app = document.getElementById("pwa");

            if (app) {
                app.style.display = "block";
            }

            return;
        }

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

        if (app) {
            app.style.display = "block";
        }


        startCountdown();

    })
    .catch(err => {

        console.error("License error:", err);

        const app = document.getElementById("pwa");

        if (app) {
            app.style.display = "block";
        }

    });



function lock() {

    const app = document.getElementById("pwa");

    if (app) {
        app.style.display = "none";
    }

    UIkit.modal("#license").show();


    const btn = document.getElementById("provider");

    if (btn) {

        btn.onclick = () => {

            window.location.href = redirectURL;

        };

    }

}
