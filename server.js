
var dir = 'C:/temp/ChangedFilePublisher';

var fs = require('fs');
var io = require('socket.io').listen(8888);

io.sockets.on('connection', function (socket) {
	socket.emit('greeting', 'Hello!');

	fs.watch(dir, function(event, filename) {
		socket.emit('changed', "---\nDetect changed event: " + event);
		if (filename)
			socket.emit('changed', "Detect changed: " + filename);
		else
			socket.emit('changed', "Detect changed: (Filename is not provided)");
	});
});

