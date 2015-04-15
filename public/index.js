
document.addEventListener('DOMContentLoaded', function(e) {
    var bg_video = document.getElementById('bg_video');
    bg_video.playbackRate = 0.8;
    bg_video.play();
    var message_container = document.getElementById('message_container');
    var message_box = document.getElementById('message_box');
    reset();
});

// UI events
$('#control').on('mousedown', function() {
    bg_video.play();
});

// Socket events
var socket = io();
socket.on('textchange', function(msg) {
    showMessageContainer();
    message_box.innerHTML = msg.replace(/\n/g,'<br>');
});

socket.on('command', function(cmd) {
    console.log("Command received: " + cmd);
    if (cmd == 'reset') {
        reset();
    } else if (cmd == 'welcome') {
        welcome();
    }
});

$('#editor').on('input', function(e) {
    socket.emit('receivertextchange', $('#editor').val());
});


function reset() {
    hideMessageContainer();
    message_box.innerHTML = "";
}

function welcome() {
    message_box.innerHTML = "Welcome to Black Box of Climate Change.";
    showMessageContainer();
}

function hideMessageContainer() {
    response.style.visibility = "hidden";
}

function showMessageContainer() {
    response.style.visibility = "visible";
}


