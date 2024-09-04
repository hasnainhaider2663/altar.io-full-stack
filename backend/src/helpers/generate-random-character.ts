export default function generateRandomCharactor() {
	const charactersString = "abcdefghijklmnopqrstuvwxyz";
	const characters = charactersString.split("");
	const randomIndex = Math.floor(Math.random() * characters.length);
	const result = characters[randomIndex];
	return { result, randomIndex };
}
