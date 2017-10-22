const app = require('./app');
const config = require('./config');
const http = require('http');

// Read port from config
const port = config.server.port || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen(port, function () {
	console.log('Server listening on port ' + port + '.');
});
