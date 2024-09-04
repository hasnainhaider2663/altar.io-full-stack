interface IRandomCharProperties {
	biasCharacter?: string;
	biasWeight?: number;
}
export default function generateRandomCharactor({ biasCharacter, biasWeight }: IRandomCharProperties) {
	const charactersString = "abcdefghijklmnopqrstuvwxyz";
	const characters = charactersString.split("");

	// find the index of the biased charactor so we can increase it's presense in the grid
	const biasCharacterIndex = biasCharacter ? characters.indexOf(biasCharacter) : -1;

	const randomIndex = Math.floor(Math.random() * characters.length);
	const result = characters[randomIndex];
	return { result, randomIndex };
}
