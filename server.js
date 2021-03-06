var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/tty.usbmodem1421", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

sp.on("open", function () {
  console.log('connected');
  sp.on('data', function(data) {
    data = data.split(',');
    io.emit('data', data);
  });
});

app.use('/assets', express.static(__dirname + '/public/assets'));

server.listen(3006);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});