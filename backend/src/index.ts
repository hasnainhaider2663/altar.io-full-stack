import express, { Request, Response } from "express";
import generateRandomCharactor from "./helpers/generate-random-character";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
	const result = generateRandomCharactor();
	res.send(result);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
