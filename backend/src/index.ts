import express, { Request, Response } from 'express';
import generate2dGrid from './helpers/generate-2d-grid';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	try {
		const result = generate2dGrid({ numberOfRowsAndColumns: 10, biasCharacter: 'O', biasWeight: 0.3 });
		res.send(result);
	} catch (error) {
		res.status(401).send({ error });
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
