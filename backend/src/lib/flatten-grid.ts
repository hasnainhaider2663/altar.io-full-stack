export default function flattenGrid(array: string[][]) {
	return array.reduce((x, y) => [...x, ...y]);
}
