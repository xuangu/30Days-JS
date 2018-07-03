// const fs = require('fs');
import js from 'fs';
import http from 'http';

js.readFile(
  './Syntax.js', (err, data) => {
    console.log(data.toString());
  }
);

// Server
let app = http.createServer();
app.on('request', (req, res) => {
  console.log("server");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Welcome to Node World\n");
}).listen(3000, () => {
  console.log("hello server");
});  

// Client: Note在访问本机代码时不能在localhost前加http://
http.get({host: 'localhost', path: '/', port: 3000}, function(res) {
  res.on('data', (data) => {
    console.log(data.toString());
  });
});
