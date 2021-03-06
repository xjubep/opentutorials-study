var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', function (error, filelist) {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(title, filelist);
                var html = template.html(title, list, description,
                    `
                    <div id="control">
                        <input type="button" class="btn" value="create" onclick="location.href='/create'";>
                    </div>
                    `
                );
                response.writeHead(200);
                response.end(html);
            });
        }
        else {
            fs.readdir('./data', function (error, filelist) {
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                    var title = filteredId;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, {
                        allowedTags:['h1']
                    });
                    var list = template.list(sanitizedTitle, filelist);
                    var html = template.html(sanitizedTitle, list, sanitizedDescription,
                        `
                        <div id="control">
                            <input type="button" class="btn" value="create" onclick="location.href='/create'";>
                            <input type="button" class="btn" value="update" onclick="location.href='/update?id=${sanitizedTitle}'";>
                            <form action="delete_process" method="post">
                                <input type="hidden" name="id" value="${sanitizedTitle}">
                                <input class="btn" type="submit" value="delete">
                            </form>
                        </div>
                        `
                    );
                    response.writeHead(200);
                    response.end(html);   
                });
            });
        }
    }
    else if (pathname === '/create') {
        fs.readdir('./data', function (error, filelist) {
            var title = 'Create';
            var list = template.list(title, filelist);
            var html = template.html(title, list, `
            <form action="/create_process" method="post">
                <p><input type="text" class="title" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p align="center">
                    <input type="submit">
                </p>
            </form>
            `, ' ');

            response.writeHead(200);
            response.end(html);
        });
    }
    else if (pathname === '/create_process') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function (data) {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;

            fs.writeFileSync(`./data/${title}`, description, 'utf8', function (err) {
                response.writeHead(302, { 'Location': `/?id=${title}` });
                response.end();
            });
        });
    }
    else if (pathname === '/update') {
        fs.readdir('./data', function (error, filelist) {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                var title = filteredId;
                var list = template.list(title, filelist);
                var html = template.html(title, list, `
                    <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p>
                            <input type="text" class="title" name="title" placeholder="title" value="${title}"></p>
                        <p>
                            <textarea name="description" placeholder="description" value="${description}"></textarea>
                        </p>
                        <p align="center">
                            <input type="submit">
                        </p>
                    </form>
                    `, ' '
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if (pathname === '/update_process') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function (data) {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            console.log(title);
            fs.rename(`data/${id}`, `data/${title}`, function (error) {
                fs.writeFileSync(`data/${title}`, description, 'utf8', function (err) {
                    response.writeHead(302, { 'Location': `/?id=${title}` });
                    response.end();
                });
            });
        });
    }
    else if (pathname === '/delete_process') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function (data) {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(error) {
                response.writeHead(302, { 'Location': `/` });
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);