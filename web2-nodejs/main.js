var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, description) {
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="colors.js"></script>
    </head>

    <body>
        <h1><a href="/">WEB</a></h1>
        <div id="grid">
            ${list}
            
            <div id="article">
                <h2>${title}</h2>
                ${description}                
            </div>
        </div>
        <div id="toggle">
            <input type="button" value="night" onclick="nightDayHandler(this);">
        </div>
    </body>

    </html>
    `;
}

function templateList(title, filelist) {
    var list = '<ol>';
    for (var i = 0; i < filelist.length; i++) {
        if (title === filelist[i]) {
            list += '<b>'
        }
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        if (title === filelist[i]) {
            list += '</b>'
        }
    }
    list += '</ol>';
    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function (error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(title, filelist);
                var template = templateHTML(title, list, description);
                response.writeHead(200);
                response.end(template);
            });
        }
        else {
            fs.readdir('./data', function (error, filelist) {
                var title = queryData.id;
                var list = templateList(title, filelist);

                fs.readFile(`data/${title}`, 'utf8', function (err, description) {
                    var template = templateHTML(title, list, description);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);