export function fnStringListToString(list: string[], separator: string): string {
	let result = "";
	result = list.filter((item) => item).join(separator);
	return result;
}
