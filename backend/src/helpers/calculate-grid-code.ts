import flattenGrid from './flatten-grid';
import getDigitsFromNumber from './get-digits-from-number';

export default function calculateCode(grid: string[][]) {
	const now = new Date();
	const seconds = now.getSeconds();

	const digits = getDigitsFromNumber(seconds);

	const firstCell = grid[digits[0]][digits[1]];
	const secondCell = grid[digits[1]][digits[0]];
	let firstCellOccurrences = flattenGrid(grid).filter((x) => x === firstCell).length;
	let secondCellOccurrences = flattenGrid(grid).filter((x) => x === secondCell).length;

	if (firstCellOccurrences > 9) {
		firstCellOccurrences = adjustCount(firstCellOccurrences);
	}

	if (secondCellOccurrences > 9) {
		secondCellOccurrences = adjustCount(secondCellOccurrences);
	}
	return firstCellOccurrences + '' + secondCellOccurrences;
}

function adjustCount(count: number): number {
	if (count <= 9) return count;
	const divisor = Math.ceil(count / 9);
	return Math.floor(count / divisor);
}
