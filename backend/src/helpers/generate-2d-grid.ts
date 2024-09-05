import calculateCode from './calculate-grid-code';
import flattenGrid from './flatten-grid';
import generateRandomCharactor from './generate-random-character';

interface IGridProps {
	numberOfRowsAndColumns: number;
	biasCharacter?: string;
	biasWeight?: number;
}
export default function generate2dGrid({ numberOfRowsAndColumns = 10, biasCharacter, biasWeight }: IGridProps) {
	let grid = [];
	for (let i = 0; i < numberOfRowsAndColumns; i++) {
		const row = [];
		for (let j = 0; j < numberOfRowsAndColumns; j++) {
			const randomCharacter = generateRandomCharactor({ biasCharacter, biasWeight });
			row.push(randomCharacter);
		}
		grid.push(row);
	}

	if (biasCharacter && biasWeight) {
		const flattenedArray = flattenGrid(grid); //flatten the array to make counting and indexing simpler
		let occurrencesOfBiasedCharacter = flattenedArray.filter((x) => x === biasCharacter).length;

		let isBiasMet = occurrencesOfBiasedCharacter < biasWeight * flattenedArray.length;

		// if biasCharacter and biasWeight exist and IF the bias was not met, force the bias with the character in random places
		if (isBiasMet) {
			grid = []; // reset the grid

			while (isBiasMet) {
				const randomizedIndex = Math.floor(Math.random() * flattenedArray.length);
				flattenedArray[randomizedIndex] = biasCharacter;
				occurrencesOfBiasedCharacter = flattenedArray.filter((x) => x === biasCharacter).length;
				isBiasMet = occurrencesOfBiasedCharacter < biasWeight * 100;
			}
			// convert back to grid
			while (flattenedArray.length > 0) {
				const chunk = flattenedArray.splice(0, 3);

				grid.push(chunk);
			}
		}
	}
	const code = calculateCode(grid);

	return { grid, code };
}
