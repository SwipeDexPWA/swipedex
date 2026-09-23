const grid = document.getElementById("qr-codes");

const buttons = window.QR_BUTTONS || [];

console.log("QR BUTTONS LOADED:", buttons);
console.log("TOTAL BUTTONS:", buttons.length);

(async () => {
  for (const item of buttons) {
    console.log("✔ ADD:", item.key, item.label);

    const div = document.createElement("div");
    div.className = "qr-item";

    div.innerHTML = `
      <a href="#qr-popup"
         uk-toggle
         class="qr-trigger"
         data-key="${item.key}"
         data-title="${item.label}"
         data-qr="${item.qr}"
         data-link="${item.value || ''}"
         data-location="${item.location || ''}">
        <img class="icon" src="${item.icon}">
        <div class="qr-label uk-margin-xsmall-top">
          ${item.label}
        </div>
      </a>
    `;

    grid.appendChild(div);
  }
})();

document.addEventListener("click", function (e) {

  const trigger = e.target.closest(".qr-trigger");

  if (!trigger) return;

  const key = trigger.dataset.key;
  const title = trigger.dataset.title;
  const qr = trigger.dataset.qr;
  const link = trigger.dataset.link;

  document.getElementById("qr-title").textContent = title;
  document.getElementById("qr-image").src = qr;

  const qrLink = document.getElementById("qr-link");
  const qrShare = document.getElementById("qr-share");

  if (key === "share") {

    qrLink.style.display = "none";
    qrShare.style.display = "block";

    a2a_config.linkurl = link;
    a2a_config.linkname = document.title;

    if (window.a2a) {
      a2a.init_all();
    }

  } else {

    qrShare.style.display = "none";
    qrLink.style.display = "";

    qrLink.innerHTML = "";

    if (link) {
      const a = document.createElement("a");

      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = link;

      qrLink.appendChild(a);
    }
  }

});