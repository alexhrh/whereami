'use strict';

var fs = require('fs');
var contentTypes = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
    'json': 'application/json'
};
function staticFile(request, response, path) {
    console.log("send file: " + path);
    var extention = path.split('.').pop();
    fs.readFile(path, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.end();
            console.log(error);
        }
        else {
            response.writeHead(200, { 'Content-Type': contentTypes[extention] });
            response.end(data);
        }
    });
}
module.exports = staticFile;
