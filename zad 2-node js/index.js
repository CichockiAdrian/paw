const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const requestListener = (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Strona główna');
    } else if (req.url === '/2') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const filePath = path.join(__dirname, 'package.json');
        fs.readFile(filePath, (err, data) => {
            res.end(data);
        });
    } else if (req.url === '/3') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
           <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                Kod html
            </body>
            </html>
        `);
    } else if (req.url === '/4') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url.startsWith('/get_params')) {
        const queryObject = url.parse(req.url, true).query;
        console.log(queryObject);

        const JsonArray = JSON.stringify(queryObject);
        const filePath = path.join(__dirname, `params_${Date.now()}.json`);

        fs.writeFile(filePath, JsonArray, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'plik nie zapisany' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JsonArray);
            }
        });
    }

 else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404');
    }
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
