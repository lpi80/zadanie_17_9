const fs = require('fs');
const formidable = require('formidable');

let imageName;
exports.upload = function (request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    const form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        imageName =  files.upload.name
        fs.renameSync(files.upload.path, imageName);
        fs.readFile('templates/upload.html', function (err, html) {
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(html);
            response.end();
        });
    });
}

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function (err, html) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(html);
        response.end();
    });
}

exports.show = function (request, response) {
    fs.readFile(imageName, "binary", function (error, file) {
        response.writeHead(200, { "Content-Type": "image/png" });
        response.write(file, "binary");
        response.end();
    });
}

exports.css = function (request, response) {
    console.log("Ładujemy css");
    fs.readFile('templates/style.css', function (error, css) {
        response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
        response.write(css);
        response.end();
    });
}

exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}