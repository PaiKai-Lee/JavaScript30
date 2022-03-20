function select(element) {
    return document.querySelector(element);
}
const video = select(".player__video");
const play = select(".player__button");
const progress = select(".progress");
const progressBar = select(".progress__filled");
const volume = select("input[name='volume']");
const playbackRate = select("input[name='playbackRate']");
const skipButtons = document.querySelectorAll("[data-skip");
let mousedown = false;

function playHandler() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function playingHandler() {
    play.innerText = "||";
}

function pauseHandler() {
    play.innerText = "►";
}

function timeUpdateHandler() {
    const timePercent = ~~((video.currentTime / video.duration) * 100);
    progressBar.style.flexBasis = `${timePercent}%`;
}

function progressHandler(e) {
    mousedown = true;
    const setTime = (e.offsetX / this.offsetWidth) * video.duration;
    video.currentTime = setTime;
}

function mouseMoveHandler(e) {
    if (!mousedown) return;
    const setTime = (e.offsetX / this.offsetWidth) * video.duration;
    video.currentTime = setTime;
}

function rangeHandler(e){
    video[this.name] = this.value;
}

function skip() {
    const { skip } = this.dataset;
    video.currentTime += ~~skip;
}

play.addEventListener("click", playHandler);
progress.addEventListener("mousedown", progressHandler);
progress.addEventListener("mousemove", mouseMoveHandler);
progress.addEventListener("mouseup", () => (mousedown = false));
video.addEventListener("click", playHandler);
video.addEventListener("play", playingHandler);
video.addEventListener("pause", pauseHandler);
video.addEventListener("timeupdate", timeUpdateHandler);

volume.addEventListener('change',rangeHandler);
playbackRate.addEventListener('change',rangeHandler);

skipButtons.forEach(button => {
    button.addEventListener("click", skip);
});
