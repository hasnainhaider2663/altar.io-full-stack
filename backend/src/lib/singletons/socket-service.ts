import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Payment } from '../../models/Payment';
import generate2dGrid from '../generate-2d-grid';
import PaymentsDbService from './payments-db-service';

class SocketService {
	private static instance: Server;

	public static initialize(httpServer: HttpServer, cors: any): Server {
		if (!SocketService.instance) {
			SocketService.instance = new Server(httpServer, {
				cors,
			});

			SocketService.instance.on('connection', (socket) => {
				console.log('A user connected');

				//send all payments to a client when it connects
				const payments = PaymentsDbService.getInstance().getAllPayments();
				socket.emit('payments-updated', payments);

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

	// Payment Events
	private static newPayment = (socket: Socket) => (payment: Payment) => {
		console.log('new payment', payment);

		PaymentsDbService.getInstance().createPayment(payment);
		const payments = PaymentsDbService.getInstance().getAllPayments();
		socket.emit('payments-updated', payments);
		socket.broadcast.emit('payments-updated', payments);
	};

	// Grid Events
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
