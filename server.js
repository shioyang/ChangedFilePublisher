
var dir = 'C:/temp/ChangedFilePublisher';

var fs = require('fs');
var io = require('socket.io').listen(8888);

io.sockets.on('connection', function (socket) {
	socket.emit('greeting', 'Hello!');

	fs.watch(dir, function(event, filename) {
		if (filename) {
			var changedInfo = {
				filenames: [ filename ]
			};
			socket.emit('changed', JSON.stringify(changedInfo));
//		} else {
//			socket.emit('changed', "Detect changed: (Filename is not provided)");
		}
	});
});

