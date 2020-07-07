// var app = require('express')();

// var server = require('http').Server(app);
var server = require('http').Server();
var io = require('socket.io')(server);
require('dotenv').config()

var Redis = require("ioredis");
console.log(process.env.REDIS_HOST, process.env.REDIS_PORT)
var redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis.set("foo", "bar");

redis.subscribe('tictac_database_channel');
// console.log(redis);

redis.on('message', function (channel, message) {
  console.log('Message Received', message);
  console.log(JSON.parse(message));
  const ch = JSON.parse(message);
  io.emit(ch.token, message);
});

server.listen(process.env.PORT);

// app.get('/', function (request, response) {
//   response.sendFile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//   console.log('A connection was made')
// });