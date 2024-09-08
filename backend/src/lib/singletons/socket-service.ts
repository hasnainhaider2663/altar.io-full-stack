import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Payment } from '../../models/Payment';
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
				socket.on('generate-grid', SocketService.generateGrid(socket));

				// stops other clients (other than the one firing the event) from emitting their key every 2 seconds
				socket.on('stop-emitting-all-except', SocketService.stopAllExceptCurrentFromEmitting(socket));

				// receives a new payment
				socket.on('new-payment', SocketService.newPayment(socket));
			});
		}
		return SocketService.instance;
	}

	private static newPayment = (socket: Socket) => (payment: Payment) => {
		socket.broadcast.emit('payments-updated', payment);
	};
	private static stopAllExceptCurrentFromEmitting = (socket: Socket) => (id: string) => {
		socket.broadcast.emit('stop-emitting', id);
	};
	private static generateGrid = (socket: Socket) => (data: any) => {
		socket.broadcast.emit('stop-emitting', data.id);

		const { biasCharacter, biasWeight } = data;
		const result = generate2dGrid({ numberOfRowsAndColumns: 10, biasCharacter, biasWeight });

		socket.emit('grid-updated', result);
		socket.broadcast.emit('grid-updated', result);
	};

	public static getInstance(): Server {
		if (!SocketService.instance) {
			throw new Error('Socket has not been initialized. Initialize first.');
		}
		return SocketService.instance;
	}
}

export default SocketService;
