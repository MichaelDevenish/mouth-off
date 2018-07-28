const SimplePeer = require('simple-peer');
const SimpleWebsocket = require('simple-websocket');
const EventEmitter = require('events').EventEmitter;
 
const peers = [];
const emitter = new EventEmitter();

const serverURL = 'wss-signal-server.glitch.me';
const serverPort = 80;
 
module.exports = function() {
  const socket = new SimpleWebsocket(`ws://${serverURL}:${serverPort}`);
  socket.on('close', function() { console.log('Socket closed'); });
  socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
  socket.on('connect', function() { console.log('Connected'); });
 
  socket.on('data', function(data) {
    const rtc = new SimplePeer({ initiator: false, trickle: false });
 
    rtc.signal(data);
    rtc.on('signal', function(data) {
      socket.send(data);
    });
 
    rtc.on('connect', function() {
      peers.push(rtc);
    });
 
    rtc.on('data', function(msg) {
      emitter.emit('message', msg);
 
      //as host, we need to broadcast the data to the other peers
      peers.forEach(function(p) {
        if(p === rtc) {
          return;
        }
 
        p.send(msg);
      });
    });
  });
 
  return {
 
  };
};