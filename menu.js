// Add to Home Screen
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
});
document.getElementById('installLink').addEventListener('click', async (e) => {
  e.preventDefault();
  const ua = navigator.userAgent.toLowerCase();
  const isChrome = ua.includes("chrome") && !ua.includes("edg") && !ua.includes("opr");
  if (isChrome && deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("User choice:", outcome);
    deferredPrompt = null;
  } else {
    UIkit.notification({
      message: '<article class="uk-comment poppins-regular" role="comment"><header class="uk-comment-header uk-border-circle"><div class="uk-grid-small uk-flex-middle uk-padding-small" uk-grid><div class="uk-width-auto"><img class="uk-comment-avatar" src="../anigen-hub/images/chrome.svg" width="80" height="80" alt=""></div><div class="uk-width-expand"><h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset poppins-regular" href="#">Google Chrome</a></h4><p class="uk-comment-meta uk-margin-remove-top">Please Use Chrome to Install this Web App.</p></div></div></header></article>',
      pos: 'top-center',
      timeout: 5000
    });
  }
});
// Refresh
function refreshApp() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.update().then(() => {
          window.location.reload(true);
        });
      } else {
        window.location.reload(true);
      }
    });
  } else {
    window.location.reload(true);
  }
}
// Fullscreen
function openFullscreen() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
document.getElementById('fullscreenLink').addEventListener('click', (e) => {
  e.preventDefault();
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
});
function updateFullscreenLink() {
  const link = document.getElementById('fullscreenLink');
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    link.innerHTML = '<span class="uk-margin-xsmall-right" uk-icon="icon: shrink"></span> Exit Fullscreen';
  } else {
    link.innerHTML = '<span class="uk-margin-xsmall-right" uk-icon="icon: expand"></span> Fullscreen';
  }
}
document.addEventListener("fullscreenchange", updateFullscreenLink);
document.addEventListener("webkitfullscreenchange", updateFullscreenLink);
// Valid Thru
const countdownEl = document.getElementById("countdown");
fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("Unable to load data.json");
    return res.json();
  })
  .then(siteData => {
    const license = siteData.license;
    function showLicenseDialog() {

      UIkit.modal("#license-modal").show();

      document.getElementById("contact-provider").onclick = () => {
        window.location.href = license.redirect;
      };

    }
    if (!license) return;
    const expireTime = new Date(license.expires).getTime();
    const redirectURL = license.redirect;
    function redirect() {
      window.location.replace(redirectURL);
    }
    // Disabled by reseller
    if (license.disabled) {
      showLicenseDialog();
      return;
    }
    // Already expired
    if (Date.now() >= expireTime) {
      showLicenseDialog();
      return;
    }
    function updateCountdown() {
      let diff = expireTime - Date.now();
      if (diff <= 0) {
        clearInterval(timer);
        showLicenseDialog();
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
    const timer = setInterval(updateCountdown, 1000);
  })
  .catch(error => {
    console.error(error);
  });
// Copyright
document.getElementById("copyright-year").textContent = new Date().getFullYear();