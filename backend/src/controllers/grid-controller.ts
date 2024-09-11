import { Request, Response, Router } from 'express';
import generate2dGrid from '../lib/generate-2d-grid';
import SocketService from '../lib/singletons/socket-service';
const gridRouter = Router();

gridRouter.post('/', (req: Request, res: Response) => {
	try {
		const socketService = SocketService.getInstance();
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
		socketService.emit('grid-updated', result);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error });
	}
});

export default gridRouter;
