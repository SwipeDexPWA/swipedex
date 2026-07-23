// Maximize
function openMaximize() {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
function closeMaximize() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
document.getElementById('maximize').addEventListener('click', (e) => {
  e.preventDefault();
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    openMaximize();
  } else {
    closeMaximize();
  }
});
function updateMaximize() {
  const link = document.getElementById('maximize');
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    link.innerHTML = '<img class="icon" src="../minimize.svg">';
  } else {
    link.innerHTML = '<img class="icon" src="../maximize.svg">';
  }
}
document.addEventListener("fullscreenchange", updateMaximize);
document.addEventListener("webkitfullscreenchange", updateMaximize);