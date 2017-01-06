var http = require('http');
var fs = require('fs');

var hostname = '127.0.0.1';
var port = 3000;

//trick
var routes = [
  { method: 'GET', path: '/', content: hello },
  { method: 'GET', path: '/randomNumber', content: random },
  { method: 'GET', path: '/eightball', content: eightball },
  //{ method: 'GET', path: url.match(/hello\/(\w+)/i), content: greet },
  { method: 'GET', path: '/coinToss', content: coinToss },
  { method: 'GET', path: '/paris', content: paris }
];

var server = http.createServer(function(request, response) {
  var method = request.method;
  var url = request.url;
  console.log('Incoming ' + method + ' request' + ' to ' + url);

  //302 rerouting webpage url
  //response.statusCode = 302;
  var action = routes.find(function(route) {
    return route.method === method && route.path === url;
  });
  if(action) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write(action.content());
  } else if (method === 'GET' && url === '/visit?destination=paris') {
    response.statusCode = 302;
    response.setHeader('Location', '/paris');
  } else {
    response.statusCode = 404;
    response.write('Uh-Ooh!!!');
  }
  //302 new url to go to
  //response.setHeader('Location', 'http://www.google.com');
  response.end();
});

server.listen(port, hostname, function(){
  console.log('Server running at http://' + hostname + ':' + port);
});

function paris() {
  return 'Welcome to Paris!';
}
function coinToss() {
  var coin = ['heads', 'tails'];
  var num = Math.floor( Math.random() * 2 );
  return coin[num];
}
function greet() {

}
function eightball() {
  var index = ['Yes', 'No', 'Maybe'];
  var num = Math.floor( Math.random() * 3);
  return index[num];
}
function random() {
  return '' + Math.floor( Math.random() * 10 + 1);
}
function hello() {
  return 'Hello and welcome';
}
