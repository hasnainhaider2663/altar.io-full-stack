export default function flattenArray(array: string[][]) {
	return array.reduce((x, y) => [...x, ...y]);
}
