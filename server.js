var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// nodejs routing functions

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/chat.html');
});

app.get('/editor', function(req, res) {
    res.sendFile(__dirname + '/editor.html');
});

http.listen(process.env.PORT || 5000, function() {
    console.log('BBCC node.js listening on port ' + app.get('port') + "...");
});


// socket.io functions

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('textchange', function(msg) {
        io.emit('textchange', msg)
    });
    socket.on('receivertextchange', function(msg) {
        io.emit('receivertextchange', msg)
    });
    socket.on('command', function(cmd) {
        io.emit('command', cmd);
    })
});



