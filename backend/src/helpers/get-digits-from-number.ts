export default function getDigitsFromNumber(value: number) {
	let num = value;
	const digits = [];

	while (num != 0) {
		digits.push(num % 10); // using the modulo operator gets us the last digit, use 10 because the base is 10
		num = Math.trunc(num / 10); // dividing and truncating drops the last digit
	}
	digits.reverse(); // order the digits as they were in the original number
	return digits;
}
