const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    videoStream(myVideo, myVideoStream);
})

const videoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadmetadata', () => {
        video.play();
    })
}