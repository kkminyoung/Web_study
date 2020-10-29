var http = require('http');
var fs = require("fs");
var url = require('url');

http.createServer(function (request, response) {

    var path = url.parse(request.url).pathname;
    console.log("Request for " + path + " received.");

    fs.readFile('vieworders.html', function (err, data) {
        if (err) {
            return console.error(err);
        }
        fs.readFile('orders.txt', 'utf-8', function (err, order) {
            if (err) {
                return console.error(err);
            }
            else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(order.toString());
                response.end(data+order, 'utf-8');
            }
        });

    });
}).listen(8081);


