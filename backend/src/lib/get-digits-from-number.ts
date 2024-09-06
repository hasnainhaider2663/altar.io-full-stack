export default function getDigitsFromNumber(value: number) {
	let array = value.toString().padStart(2, '0').split(''); // pad start with 0 because of 0 second edge case
	return [parseInt(array[0]), parseInt(array[1])];
}
