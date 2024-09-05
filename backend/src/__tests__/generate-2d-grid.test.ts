import flattenGrid from '../helpers/flatten-grid';
import generate2dGrid from '../helpers/generate-2d-grid';
import generateRandomCharactor from '../helpers/generate-random-character';

describe('generate2dGrid', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should generate a 10x10 grid by default', () => {
		const { grid } = generate2dGrid({ numberOfRowsAndColumns: 10 });

		expect(grid).toHaveLength(10);
		grid.forEach((row) => {
			expect(row).toHaveLength(10);
		});
	});

	it('should generate a 7x7 grid', () => {
		const { grid } = generate2dGrid({ numberOfRowsAndColumns: 7 });
		expect(grid).toHaveLength(7);
		grid.forEach((row) => {
			expect(row).toHaveLength(7);
		});
	});
	const biasWeight = 0.7;

	
	const numberOfRowsAndColumns = 10;

	for (let index = 0; index < 1000; index++) {
		const biasCharacter = generateRandomCharactor({});
		it('should generate a grid biased towards a single character', () => {
			// Check that bias character appears at least 20% of the time

			const { grid } = generate2dGrid({ numberOfRowsAndColumns, biasCharacter, biasWeight });

			const flattenedArray = flattenGrid(grid);
			const occurrencesOfBiasedCharacter = flattenedArray.filter((x) => x === biasCharacter).length;
			expect(occurrencesOfBiasedCharacter).toBeGreaterThanOrEqual(biasWeight * 100);
		});

		it('code must have length of 2', async () => {
			const { code } = generate2dGrid({ numberOfRowsAndColumns, biasCharacter, biasWeight });

			// if the code doesn't have a digit greater than 9 then it should always have a lenth of 2
			expect(code).toHaveLength(2);
		});
	}
});
