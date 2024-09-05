import generateRandomCharactor from "./generate-random-character";

interface IGridProps {
	numberOfRowsAndColumns: number;
	biasCharacter?: string;
	biasWeight?: number;
}
export default function generate2dGrid({ numberOfRowsAndColumns = 10, biasCharacter, biasWeight }: IGridProps) {
	const grid = [];
	for (let i = 0; i < numberOfRowsAndColumns; i++) {
		const row = [];
		for (let j = 0; j < numberOfRowsAndColumns; j++) {
			const randomCharacter = generateRandomCharactor({ biasCharacter, biasWeight });
			row.push(randomCharacter);
		}
		grid.push(row);
	}

	return grid;
}
