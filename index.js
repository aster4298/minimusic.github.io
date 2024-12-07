const songsList = [
{
    name: "Faded",
    artist: "Alan Walker",
    src: "asset/first.mp3",
    cover: "clock.jpg"
},
{
    name: "Faded Music Ringtone",
    artist: "Alan Walker",
    src: "asset/second.mp3",
    cover: "alan.jpeg"
},
{
    name: "Harleys in Hawai",
    artist: "Kattey Perry",
    src: "asset/third.mp3",
    cover:"asset/third.jpeg"
}
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentsong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () =>{
    loadSong(currentsong);
    song.addEventListener('timeupdate', updateprogress);
    song.addEventListener('ended', nextsong);
    prevBtn.addEventListener('click', prevsong);
    nextBtn.addEventListener('click', nextsong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});
function loadSong(index){
    const {name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage =`url(${thumb})`;
}

function updateprogress(){
    if(song.duration){
        const pos =(song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText =`${currentTime} - ${duration}`;
    }
}

function formatTime(seconds){
    const minutes = math.floor(seconds / 60);
    const secs = math.floor(seconds % 60);
    return `${minutes}:${secs <10? '0': ''}${secs}`;
}

function togglePlayPause(){
    if(playing){
        song.pause();
    }
    else{
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
cover.classList.toggle('active', playing);
    }

   function nextsong(){
    currentsong =(currentsong +1) % songsList.length;
    playmusic();
   } 

   function prevsong(){
    currentsong = (currentsong - 1 + songsList.length) % songsList.length;
    playmusic();
   }

   function playmusic(){
    loadSong(currentsong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause'); 
    playBtn.classList.remove('fa-play');
    cover.classList.add('fa-play');
   }

   function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
   }

