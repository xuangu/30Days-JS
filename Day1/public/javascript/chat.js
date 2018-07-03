var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room
  });
};
// /nick guxuan; /join 2
Chat.prototype.parseCommand = function(commandStr) {
  var inputs = command.split(' ');
  var command = inputs[0].substring(1, inputs[0].length - 1);

  var message = '';

  switch (command) {
    case 'nick':
      inputs.shift();
      var name = inputs.join(' ');
      this.socket.emit('nameAttempt', name);
      break;

    case 'join':
      inputs.shift();
      var room = inputs.join(' ');
      this.changeRoom(room);
      break;

    default:
      message = 'Unrecognized command.';
      break;
  }

  return message;
}
