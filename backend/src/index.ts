import express, { Request, Response } from 'express';
import generate2dGrid from './helpers/generate-2d-grid';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	const result = generate2dGrid({ numberOfRowsAndColumns: 10 });
	res.send(result);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
