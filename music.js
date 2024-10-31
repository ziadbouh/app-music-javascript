// Sélection des éléments HTML
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeSpan = document.querySelector('.current-time');
const durationSpan = document.querySelector('.duration');
const songInfo = document.querySelector('.song-info');
const coverImage = document.querySelector('.cover img');

// Liste des musiques
const songs = [
  {
    title: 'Lost in the City Lights',
    artist: 'Cosmo Sheldrake',
    cover: 'cover-1.png',
    audio: 'lost-in-city-lights-145038.mp3',
  },
  {
    title: 'Forest Lullaby',
    artist: 'Inconnu',
    cover: 'cover-2.png',
    audio: 'forest-lullaby-110624.mp3',
  },
];

// Initialisation de l'index de la musique actuelle
let currentSongIndex = 0;

// Fonction pour mettre à jour les informations de la musique actuelle
function updateSongInfo() {
  songInfo.innerHTML = `
    <h2>${songs[currentSongIndex].title}</h2>
    <p>${songs[currentSongIndex].artist}</p>
  `;
  coverImage.src = songs[currentSongIndex].cover;
}

// Fonction pour jouer la musique actuelle
function playSong() {
  const audio = document.getElementById(songs[currentSongIndex].audio);
  audio.play();
  playButton.innerHTML = '⏸️';
}

// Fonction pour mettre en pause la musique actuelle
function pauseSong() {
  const audio = document.getElementById(songs[currentSongIndex].audio);
  audio.pause();
  playButton.innerHTML = '⏯️';
}

// Fonction pour passer à la musique suivante
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playSong();
}

// Fonction pour passer à la musique précédente
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playSong();
}

// Fonction pour mettre à jour la barre de progression
function updateProgressBar() {
  const audio = document.getElementById(songs[currentSongIndex].audio);
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  progressFilled.style.width = `${progress}%`;
  currentTimeSpan.textContent = formatTime(currentTime);
  durationSpan.textContent = formatTime(duration);
}

// Fonction pour formater le temps en minutes et secondes
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Événements
playButton.addEventListener('click', () => {
  const audio = document.getElementById(songs[currentSongIndex].audio);
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

// Mise à jour de la barre de progression toutes les secondes
setInterval(updateProgressBar, 1000);

// Initialisation de la musique actuelle
updateSongInfo();