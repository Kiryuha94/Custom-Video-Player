const player = document.getElementById('video'),
  progress = document.getElementById('progress'),
  toggle = document.getElementById('toggle'),
  progressLine = document.getElementById('progress-line'),
  ranges = document.querySelectorAll('.slider'),
  dataSkip = document.querySelectorAll('[data-skip]');

const STATE = {
  play: 'play',
  pause: 'pause',
};

const TOGGLE_ICON = {
  play: '►',
  pause: '❚ ❚',
};

const changeStatePlayer = () => {
  const state = player.paused ? STATE.play : STATE.pause;
  player[state]();
};

function updateToggle() {
  const updateIcon = this.paused ? TOGGLE_ICON.play : TOGGLE_ICON.pause;
  toggle.innerText = updateIcon;
}

function changeVolumeAndSpeed() {
  player[this.name] = [this.value];
}

function rewindTime() {
  player.currentTime += parseFloat(this.dataset.skip);
}

const PRECENT_VALUE = 100
const changeProgress = () => {
  const currProgress = (player.currentTime / player.duration) * PRECENT_VALUE;
  progressLine.style.flexBasis = `${currProgress}%`;
};

const mouseRewind = (e) => {
  const position = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = position;
};

document.addEventListener('DOMContentLoaded', () => {
  let isMouseActive = false;
  player.addEventListener('click', changeStatePlayer);
  toggle.addEventListener('click', changeStatePlayer);
  player.addEventListener('play', updateToggle);
  player.addEventListener('pause', updateToggle);
  player.addEventListener('timeupdate', changeProgress);
  progress.addEventListener('click', mouseRewind);
  progress.addEventListener('mousemove', (e) => isMouseActive && mouseRewind(e));
  progress.addEventListener('mousedown', () => (isMouseActive = true));
  document.addEventListener('mouseup', () => (isMouseActive = false));
  ranges.forEach((el) => el.addEventListener('click', changeVolumeAndSpeed));
  dataSkip.forEach((el) => el.addEventListener('click', rewindTime));
});
