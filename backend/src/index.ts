import express from 'express';
import gridRouter from './controllers/grid-controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/grid', gridRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
