const themeClassLiust: string[] = ["app-light", "app-dark"];

export function fnSetHTMLThemeClass(input: string) {
	const root = document.documentElement;
	themeClassLiust.forEach((item) => {
		root.classList.remove(item);
	});
	root.classList.add(input);
}
