import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import generate2dGrid from '../generate-2d-grid';

class SocketService {
	private static instance: Server;

	public static initialize(httpServer: HttpServer, cors: any): Server {
		if (!SocketService.instance) {
			SocketService.instance = new Server(httpServer, {
				cors,
			});

			SocketService.instance.on('connection', (socket) => {
				console.log('A user connected');
				socket.on('disconnect', () => {
					console.log('A user disconnected');
				});

				//generates a 10x10 grid
				socket.on('generate-grid', (data) => {
					socket.broadcast.emit('stop-emitting', data.id);

					const { biasCharacter, biasWeight } = data;
					const result = generate2dGrid({ numberOfRowsAndColumns: 10, biasCharacter, biasWeight });

					socket.emit('grid-updated', result);
					socket.broadcast.emit('grid-updated', result);
				});

				// stops other clients (other than the one firing the event) from emitting their key every 2 seconds
				socket.on('stop-emitting-all-except', (id) => {
					socket.broadcast.emit('stop-emitting', id);
				});
			});
		}
		return SocketService.instance;
	}

	public static getInstance(): Server {
		if (!SocketService.instance) {
			throw new Error('Socket has not been initialized. Initialize first.');
		}
		return SocketService.instance;
	}
}

export default SocketService;
