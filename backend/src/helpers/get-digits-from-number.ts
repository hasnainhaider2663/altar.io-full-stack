export default function getDigitsFromNumber(value: number) {
	let array = value.toString().split('');

	return [parseInt(array[0]), parseInt(array[1])];
}
