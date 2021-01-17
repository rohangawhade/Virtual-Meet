const socket = io("/");

const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3000'
});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, myVideoStream);
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-connected', (userId) => {
    connectToNewUser(userId);
});

const connectToNewUser = (userId) => {
    console.log(userId);
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}