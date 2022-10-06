const wrapper = document.querySelector(".wrapper"),
      musicImg = wrapper.querySelector(".img-area img"),
      musicName = wrapper.querySelector(".song-details .name"),
      musicArtist = wrapper.querySelector(".song-details .artist"),
      playPauseBtn = wrapper.querySelector(".play-pause"),
      prevBtn = wrapper.querySelector("#prev"),
      nextBtn = wrapper.querySelector("#next"),
      mainAudio = wrapper.querySelector("#main-audio"),
      progressArea = wrapper.querySelector(".progress-area"),
      progressBar = progressArea.querySelector(".progress-bar"),
      musicList = wrapper.querySelector(".music-list"),
      moreMusicBtn = wrapper.querySelector("#more-music"),
      closemoreMusic = musicList.querySelector("#close");
      
let allMusic = [
    {
        name: "HBD BRO!",
        artist: "Nate Cano",
        img: "music-1",
        src: "music-1"
    },
    {
        name: "alone",
        artist: "shar'bit",
        img: "music-2",
        src: "music-2"
    },
    {
        name: "Title Not Related",
        artist: "trippythakid",
        img: "music-3",
        src: "music-3"
    }
];

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong(); 
});

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `assets/img/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `assets/audio/${allMusic[indexNumb - 1].src}.mp3`;
}

// play function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// pause function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// previous function
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}

// next function
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong(); 
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

// next btn event
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// update progress bar
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", ()=>{

        // update total duration
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuartion.innerText = `${totalMin}:${totalSec}`;
    });
    
    // update current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});

// change loop, shuffle, repeat onclick
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
    case "repeat":
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
    case "repeat_one":
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffled");
        break;
    case "shuffle":
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break;
    }
});

// what to do aft song ended
mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch(getText){
    case "repeat":
        nextMusic();
        break;
    case "repeat_one":
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
    case "shuffle":
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{randIndex = Math.floor((Math.random() * allMusic.length) + 1);}
        while(musicIndex == randIndex);
        loadMusic(musicIndex);
        playMusic();
        playingSong();
        break;
    }
});

// show music list onclick
moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
    <span>${allMusic[i].name}</span>
    <p>${allMusic[i].artist}</p>
    </div>
    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
    <audio class="${allMusic[i].src}" src="./assets/audio/${allMusic[i].src}.mp3"></audio>
    </li>`;
    
    ulTag.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuartionTag = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    liAudioTag.addEventListener("loadeddata", () => {
        let duration = liAudioTag.duration;
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if(totalSec < 10){ //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        };
        liAudioDuartionTag.innerText = `${totalMin}:${totalSec}`;
        liAudioDuartionTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

// play particular song from the list onclick of li tag
function playingSong() {
    const allLiTag = ulTag.querySelectorAll("li");
    for (let j = 0; j < allLiTag.length; j++) {
        let audioTag = allLiTag[j].querySelector(".audio-duration");
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if(allLiTag[j].getAttribute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// reveal animations
gsap.from("cog, h1, .img-area, .song-details, #repeat-plist, #prev, .play-pause, #next, #more-music", {
    opacity: 0,
    duration: 2,
    delay: 0.5,
    y: 20,
    ease: "expo.out",
    stagger: 0.2,
});