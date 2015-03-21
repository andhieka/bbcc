var KEY_TAB = 9;
var KEY_ENTER = 13;
var KEY_ESC = 27;

var socket = io();

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