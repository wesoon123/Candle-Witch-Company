const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT || 3000);
const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/favicon.ico') {
    response.writeHead(204).end();
    return;
  }
  if (!['/', '/index.html', '/candle-witch-redesign.html'].includes(pathname)) {
    response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    return;
  }
  fs.readFile(path.join(__dirname, 'index.html'), (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' }).end('Unable to load the page');
      return;
    }
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    response.end(content);
  });
});

server.on('error', (error) => {
  console.error(`Unable to start local server: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Candle Witch is running at http://127.0.0.1:${port}`);
});
