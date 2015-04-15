var KEY_TAB = 9;
var KEY_ENTER = 13;
var KEY_ESC = 27;

var socket = io();
var message_container, message_box;

document.addEventListener('DOMContentLoaded', function(e) {
    message_container = document.getElementById('message_container');
    message_box = document.getElementById('message_box');
});

//editor box handlers
$('#editor').on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == KEY_TAB || keyCode == KEY_ESC) {
        e.preventDefault();
        $('#command').focus();
    }
});

$('#editor').on('input', function(e) {
    socket.emit('textchange', $('#editor').val());
});

var socket = io();
socket.on('receivertextchange', function(msg) {
    message_box.innerHTML = msg.replace(/\n/g,'<br>');
});

// command box handlers
$('#command').on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == KEY_TAB) {
        e.preventDefault();
        $('#editor').focus();
    } else if (keyCode == KEY_ENTER) {
        e.preventDefault();
        executeCommand();
    }
});

function executeCommand() {
    socket.emit('command', $('#command').val());
    $('#command').val('');
}