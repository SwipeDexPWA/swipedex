document.addEventListener("click", (e) => {

    const el = e.target.closest(".qr-trigger");

    if (!el) return;

    const title = el.dataset.title;
    const qr = el.dataset.qr;
    const key = el.dataset.key;
    let link = el.dataset.link || "";
    const location = el.dataset.location || "";

    document.getElementById("qr-title").textContent = title;
    document.getElementById("qr-image").src = qr;

    const linkEl = document.getElementById("qr-link");

    switch (key) {

        case "email":
            link = `mailto:${link}`;
            break;

        case "mobile":
        case "landline":
        case "fax":
            link = `tel:${link}`;
            break;

        case "sms":
            link = `sms:${link}`;
            break;

    }

    if (link) {

        linkEl.href = link;

        linkEl.textContent =
            ["googlemaps", "waze", "openstreetmap"].includes(key)
                ? location
                : el.dataset.link;

        linkEl.style.display = "block";

    } else {

        linkEl.style.display = "none";

    }

});