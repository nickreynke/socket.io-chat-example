var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    io.emit('user connection', 'A user connected.');

    socket.on('disconnect', function () {
        io.emit('user disconnect', 'A user disconnected.');
    });

    socket.on('chat message', function (nickname, msg) {
        io.emit('user chat message', nickname, msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
