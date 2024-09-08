import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import gridRouter from './controllers/grid-controller';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: 'http://localhost:4200',
	methods: ['GET', 'POST'],
};

app.use(express.json());

const httpServer = app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

const io = new Server(httpServer, {
	cors: corsOptions,
});

app.use(cors(corsOptions));

app.use('/grid', gridRouter);

io.on('connection', (socket) => {
	console.log('A user connected');

	// You can handle custom events here
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});
