var http = require('http');
var url = require('url');
var conf = require(__dirname + '/targets');
var fs = require('fs');
var path = require('path');
//var oAuth = require('oauth').oAuth;

/* Helthcheck target */

var MARGIN = 100; // Adjust timeout for not false detection 

// Init targets
for (var target in conf.targets) {
  conf.targets[target].name = target;

  // Log file 
  conf.targets[target].logStream = fs.createWriteStream(__dirname + '/logs/' + target + '.log');
  conf.targets[target].log = function() {
    Array.prototype.unshift.call(arguments, new Date().toString());
    var msg = Array.prototype.slice.apply(arguments).join('\t') + '\n';
    //console.log.apply(this, arguments);
    this.logStream.write(msg);
  };
  conf.targets[target].logStream.write(['time', 'target', 'url', 'status', 'retry count', 'info'].join('\t') + '\n');

  // Option for http.get
  var urlObj = url.parse(conf.targets[target].url);
  conf.targets[target].httpOption = {
    host: urlObj.hostname,
    port: urlObj.port,
    path: urlObj.pathname
  };
}

// Check all targets per conf.interval
setInterval(function() {
  for (var target in conf.targets) {
    checkTarget(conf.targets[target]);
  }
}, conf.interval * 1000);

function checkTarget(target) {
  var count = 0; // Retry count

  // Send request to target
  sendCheck();
  function sendCheck() {

    var timerId;
    var req = http.get(target.httpOption, function(res) {
      clearTimeout(timerId);
      if (res.statusCode == '200') {
        update('OK');
      } else {
        update('NG', ['HTTP Error', res.statusCode]);
        retry();
      }
    });
    req.on('error', function(e) {
      clearTimeout(timerId);
      update('NG', ['Error', e]);
      retry();
    });

    // Handle http timeout
    var start = new Date().getTime();
    timerId = setTimeout(function() {
      update('NG', ['Timeout', (new Date().getTime() - start) / 1000]);
      req.abort(); 
      retry();
    }, target.timeout * 1000 + MARGIN);

    function update(status, info) {
      target.status = status;
      target.last = new Date().toString();
      target.log(target.name, target.url, status, count + 1, info ? info.join('\t') : '');
    }

    function retry() {
      if (++count < target.retry) {
        sendCheck();
      } else {
        target.trap.forEach(function(trap) {
          trap();
        });
      }
    }
  }
}

/* Monitor status from browser */

var mimes = {
 '.js': 'text/javascript',
 '.css': 'text/css',
 '.log': 'text/plain',
};

http.createServer(function(req, res) {
  // Basic auth
  var authorization = req.headers.authorization || '';
  var credential = new Buffer(authorization.slice(6), 'base64').toString('ascii');
  var authorized = (credential == conf.user + ':' + conf.pass);

  if (!authorized) {
    res.writeHead(401, 'Authorization Required', {
      'Content-Type': 'text/html',
      'WWW-Authenticate': 'Basic realm="Kanshi.js monitor"'
    });
    res.end();
    return;
  }

  var pathname = url.parse(req.url).pathname.slice(1);
  var extname = path.extname(pathname);
  if (Object.keys(mimes).indexOf(extname) > -1) {
    fs.readFile(path.join(__dirname, 'statics', pathname), function(err, data) {
      res.writeHead(200, { 'Content-Type': mimes[extname] });
      res.end(data);
    });
  } else if (pathname == 'statuses.json') { 
    var statuses = [];
    for (var target in conf.targets) {
      var status = {};
      var props = [
        'name',
        'url',
        'last',
        'status',
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        status[prop] = conf.targets[target][prop];
      }
      statuses.push(status);
    }
    //res.writeHead(200, { 'Content-Type': 'application/json' });
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(JSON.stringify(statuses, null, '\t'));
   } else if (pathname == '') { 
    fs.readFile(path.join(__dirname, 'statics', 'index.html'), function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
   } else {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('Not Found');
   }
}).listen(conf.port, function() {
  console.log('Kanshi server running on port ' + conf.port);
});

