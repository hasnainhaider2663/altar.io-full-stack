import flattenArray from '../helpers/flattenArray';
import generate2dGrid from '../helpers/generate-2d-grid';
import generateRandomCharactor from '../helpers/generate-random-character';

describe('generate2dGrid', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should generate a 10x10 grid by default', () => {
		const grid = generate2dGrid({ numberOfRowsAndColumns: 10 });

		expect(grid).toHaveLength(10);
		grid.forEach((row) => {
			expect(row).toHaveLength(10);
		});
	});

	it('should generate a 7x7 grid', () => {
		const grid = generate2dGrid({ numberOfRowsAndColumns: 7 });
		expect(grid).toHaveLength(7);
		grid.forEach((row) => {
			expect(row).toHaveLength(7);
		});
	});

	for (let index = 0; index < 1000; index++) {
		it('should generate a grid biased towards a single character', () => {
			// Check that bias character appears at least 20% of the time
			const biasWeight = 0.7;

			const biasCharacter = generateRandomCharactor({});
			const numberOfRowsAndColumns = 10;
			const grid = generate2dGrid({ numberOfRowsAndColumns, biasCharacter, biasWeight });

			const flattenedArray = flattenArray(grid);
			const occurrencesOfBiasedCharacter = flattenedArray.filter((x) => x === biasCharacter).length;
			expect(occurrencesOfBiasedCharacter).toBeGreaterThanOrEqual(biasWeight * 100);
		});
	}
});
