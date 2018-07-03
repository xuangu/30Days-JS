const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

var cache = {};

// 目前看response参数好像没什么用
function send404(response) {
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  response.write('Error 404: resource not found');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {
    'Content-Type': mime.lookup(path.basename(filePath))
  });
  response.end(fileContents);
}

function serverStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response)
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer((request, response) => {
  var filePath = '';

  if (request.url == '/') {
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  console.log(request.url);
  var absPath = './' + filePath;
  serverStatic(response, cache, absPath);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
