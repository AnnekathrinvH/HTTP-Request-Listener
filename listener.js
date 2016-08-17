var http = require('http');

var server = http.createServer();
server.on('request', function(request, response) {
    request.on('error', function(err) {
        console.log(err);
    });
    response.on('error', function(err) {
        console.log(err);
    });

    var body = '';
    var method = request.method;
    var url = request.url;
    var headers = request.headers;
    console.log(method);
    console.log(url);
    console.log(headers);

    if (method === 'GET') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<!doctype html>');
        response.write('<html>');
        response.write('<title>Hello World!</title>');
        response.write('<p>Hello World!');
        response.write('</html>');
        response.end('Hallo');
    }
    if (method === 'HEAD') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hallo');
    }
    if (method === 'POST' || method === 'PUT') {
        response.writeHead(302, {'Content-Type': 'text/html', 'Location': '/'});
        response.end();
        console.log('POST!');
        request.on('data', function(chunk) {
            body += chunk;
        }).on('end', function() {
            console.log(body);
        });

    } else {
        response.statusCode = 403;
        response.end();
    }

});
server.listen(8080, function() {
    console.log('Server is listening');
});
