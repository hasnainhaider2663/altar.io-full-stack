interface IRandomCharProperties {
	biasCharacter?: string;
	biasWeight?: number;
}

export default function generateRandomCharactor({ biasCharacter, biasWeight }: IRandomCharProperties) {
	const charactersString = 'abcdefghijklmnopqrstuvwxyz';
	const characters = charactersString.split('');
	biasWeight = biasWeight || 0;
	biasWeight = Math.min(Math.max(biasWeight, 0), 1);
	const rand = Math.random();

	if (biasCharacter && rand < biasWeight) {
		return biasCharacter;
	}

	const randomIndex = Math.floor(Math.random() * characters.length);
	return characters[randomIndex];
}
