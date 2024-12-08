import cors from 'cors';
import express from 'express';
import gridRouter from './controllers/grid-controller';
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
	origin: 'http://localhost:4200',
	methods: ['GET', 'POST'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/grid', gridRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
