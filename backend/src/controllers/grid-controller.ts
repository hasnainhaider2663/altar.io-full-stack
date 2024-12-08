import { Request, Response, Router } from 'express';
import generate2dGrid from '../lib/generate-2d-grid';
const gridRouter = Router();

gridRouter.post('/', (req: Request, res: Response) => {
	try {
		let biasCharacter, biasWeight;

		console.log('req.body', req.body);
		if (req.body) {
			biasCharacter = req.body.biasCharacter;
			biasWeight = req.body.biasWeight;
		}

		if (biasCharacter && !biasWeight) {
			throw 'biasWeight is required with biasCharacter';
		}

		if (!biasCharacter && biasWeight) {
			throw 'biasCharacter is required with biasWeight';
		}

		const result = generate2dGrid({ numberOfRowsAndColumns: 10, biasCharacter, biasWeight });
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error });
	}
});

export default gridRouter;
