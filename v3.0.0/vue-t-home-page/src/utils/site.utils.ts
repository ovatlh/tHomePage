export function fnGetURLIconSite(url: string): string {
	let result = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`;
	return result;
}
