window.addEventListener("load", registerSW);

async function registerSW() {

    if ("serviceWorker" in navigator) {

        try {

            const reg = await navigator.serviceWorker.register(
                "/serviceworker.js",
                {
                    scope: "./"
                }
            );

            console.log(
                "SW registered:",
                reg.scope
            );

        } catch (e) {

            console.error(
                "SW ERROR:",
                e
            );

        }

    }

}
