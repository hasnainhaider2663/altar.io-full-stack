import generateRandomCharactor from "./generate-random-character";

interface IGridProps {
	numberOfRowsAndColumns: number;
	biasCharacter?: string;
	biasWeight?: number;
}
export default function generate2dGrid({ numberOfRowsAndColumns = 10, biasCharacter, biasWeight }: IGridProps) {
	const grid = [];
	const map = new Map();
	for (let i = 0; i < numberOfRowsAndColumns; i++) {
		const row = [];
		for (let j = 0; j < numberOfRowsAndColumns; j++) {
			const randomCharacter = generateRandomCharactor({biasCharacter, biasWeight}).result;
			row.push(randomCharacter);
			const occurence = map.get(randomCharacter) || 0;
			map.set(randomCharacter, occurence + 1);
		}
		grid.push(row);
	}
	const occurrences = Object.fromEntries(map.entries());

	return { grid, occurrences };
}
