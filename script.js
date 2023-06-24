const image = document.getElementById("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currnetTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

// 
const songs = [
    {
        name: "Mahdi-1",
        displayNAme: "Yousufi-1",
        artist: "Mahdi123",
    },
    {
        name: "Mahdi-2",
        displayNAme: "Yousufi-2",
        artist: "Mahdi123",
    },
    {
        name: "Mahdi-3",
        displayNAme: "Yousufi-3",
        artist: "Mahdi123",
    },
    {
        name: "Mahdi-4",
        displayNAme: "Yousufi-4",
        artist: "Mahdi123",
    },
]


let isPlaying = false;

// 
function playSong() {
    isPlaying = true
    music.play();
    playBtn.classList.replace('fa-play', "fa-pause")
    playBtn.setAttribute("title", 'Pause')
}
function pauseSong() {
    music.pause();
    playBtn.classList.replace('fa-pause', "fa-play")
    playBtn.setAttribute("title", 'play')
    isPlaying = false
}

// 
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayNAme;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

let songIndex = 0;

function nextSong() {
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    songIndex++;
    loadSong(songs[songIndex])
    playSong()
}


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}


loadSong(songs[songIndex]);

function updateProgressBAr(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.secElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration / 60);
        let durationSecondes = Math.floor(duration % 60)
        if (durationSecondes < 10) {
            durationSecondes = `0${durationSecondes}`
        }

        if (durationSecondes) {
            durationEl.textContent = `${durationMinutes}:${durationSecondes}`;
        }


        const currentMinutes = Math.floor(currentTime / 60);
        let currentSecondes = Math.floor(currentTime % 60)
        if (currentSecondes < 10) {
            currentSecondes = `0${currentSecondes}`
        }
        currnetTimeEl.textContent = `${currentMinutes}:${currentSecondes}`;
    }
}


// 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate', updateProgressBAr);
progressContainer.addEventListener("click", setProgressBar);


