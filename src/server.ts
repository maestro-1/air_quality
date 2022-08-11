import * as http from 'http';
import { application } from './app';


//Change port to 8080 when deploying to aws
const port = normalizePort(process.env.PORT || "3000");
application.app.set('port', port);

const server = http.createServer(application.app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val: string): number {
	const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
	if (isNaN(port)) throw Error(`Could not handle port ${port}`);
	if (port > 1000) return port;
	throw Error(`Could not handle port ${port}`);
}

function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') throw error;
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
		default:
			throw error;
	}
}

function onListening(): void {
	const addr = server.address();
	const bind: string =
		typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
	console.log(`Server started:Listening on ${bind}`);
}

export { server };
