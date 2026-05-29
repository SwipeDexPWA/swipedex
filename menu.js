document.write(`
            <ul class="uk-nav uk-nav-default poppins-semibold uk-dark">
                <li><a href="" id="installLink"><span class="uk-margin-xsmall-right" uk-icon="icon: tablet"></span>
                        Add
                        to Home Screen</a></li>
                <li><a href="" onclick="refreshApp(); return false;"><span class="uk-margin-xsmall-right"
                            uk-icon="icon: refresh"></span> Update Web App</a></li>
                <li><a href="" id="fullscreenLink"><span class="uk-margin-xsmall-right" uk-icon="icon: expand"></span>
                        Go Fullscreen</a></li>
                <li><a href=""><span class="uk-margin-xsmall-right" uk-icon="icon: cart"></span>
                        Buy, Renew or Revise</a></li>
                <li><a href="" onclick="UIkit.offcanvas('#menu').hide(); return false;"><span
                            class="uk-margin-xsmall-right" uk-icon="icon: close-circle"></span> Exit Menu</a></li>
            </ul>
`);

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