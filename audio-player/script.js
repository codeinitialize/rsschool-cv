const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const coverImg = document.getElementById('cover-img');

let isPlay = false;
let playNum = 0;
const tracks = [
  { src: 'assets/audio/beyonce.mp3', cover: 'assets/img/lemonade.png', title: 'Lemonade', artist: 'Beyoncé' },
  { src: 'assets/audio/dontstartnow.mp3', cover: 'assets/img/dontstartnow.png', title: 'Don\'t Start Now', artist: 'Dua Lipa' }
];


function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  coverImg.src = track.cover; 
  audio.load();
  resetProgressBar();
}


function resetProgressBar() {
  progressBar.value = 0;
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function togglePlayPause() {
  if (!isPlay) {
    audio.play();
    playPauseIcon.src = 'assets/svg/pause.png'; 
    isPlay = true;
  } else {
    audio.pause();
    playPauseIcon.src = 'assets/svg/play.png'; 
    isPlay = false;
  }
}


audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});


progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});


function playNext() {
  playNum = (playNum + 1) % tracks.length;
  loadTrack(playNum);
  if (isPlay) {
    audio.play(); 
  }
}

function playPrev() {
  playNum = (playNum - 1 + tracks.length) % tracks.length;
  loadTrack(playNum);
  if (isPlay) {
    audio.play(); 
  }
}


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${sec}`;
}


loadTrack(playNum);


playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);


audio.addEventListener('ended', playNext);