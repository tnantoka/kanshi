var http = require('http');

var PORT = 3001;

http.createServer(function(req, res) {
  switch(req.url) {
    case '/sleep3':
      console.log('/sleep3');
      setTimeout(function() {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('OK');
      }, 3000);
      break
    case '/503':
      console.log('/503');
      setTimeout(function() {
        res.writeHead(503, {'Content-Type': 'text/html'});
        res.end('NG');
      }, 3000);
      break
    case '/':
    case '/':
    default:
      console.log('/');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end('OK');
      break
  }
}).listen(PORT, function() {
  console.log('Test server running on port', PORT);
});

