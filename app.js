// app.js - A simple web server
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DevOps Demo</title>
        <style>
          body { font-family: Arial; text-align: center; margin-top: 100px; }
          .container { background: #f0f8ff; padding: 50px; border-radius: 10px; }
          .success { color: #28a745; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="success">DevOps Pipeline Working!</h1>
          <p>This page was deployed automatically using:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>Jenkins for automation</li>
            <li>Docker for containerization</li>
            <li>Automated testing in mind</li>
          </ul>
          <p>If you are seeing this, this means that you are good to go!</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Version:</strong> 1.0.0</p>
        </div>
      </body>
      </html>
    `);
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page Not Found</h1>');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Health check at http://localhost:${PORT}/health`);
});