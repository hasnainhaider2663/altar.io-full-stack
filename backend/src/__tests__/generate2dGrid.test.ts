import generate2dGrid from "../helpers/generate-2d-grid";

describe("generate2dGrid", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should generate a 10x10 grid by default", () => {
		const grid = generate2dGrid({ numberOfRowsAndColumns: 10 });

		// Check grid size and content
		expect(grid).toHaveLength(10);
		grid.forEach((row) => {
			expect(row).toHaveLength(10);
		});
	});

	it("should generate a 7x7 grid", () => {
		const grid = generate2dGrid({ numberOfRowsAndColumns: 7 });
		console.log("grid", grid);
		// Check grid size and content
		expect(grid).toHaveLength(7);
		grid.forEach((row) => {
			expect(row).toHaveLength(7);
		});
	});

	it("should generate a grid biased towards a single character", () => {
		// Check that bias character appears at least 20% of the time
		const biasWeight = 0.2;

		const biasCharacter = "z";
		const grid = generate2dGrid({ numberOfRowsAndColumns: 10, biasCharacter, biasWeight });
		console.log("grid", grid);
		const flattenedArray = grid.reduce((x, y) => [...x, ...y]);
		const occurrencesOfBiasedCharacter = flattenedArray.filter((x) => x === biasCharacter).length;

		expect(occurrencesOfBiasedCharacter).toBeGreaterThanOrEqual(biasWeight * 100);
	});
});
