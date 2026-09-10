export function fnArrayToGroupArrayByProperty(list: any[] = [], property: string = "", defaultValue: string = "NONE") {
	const grouped = list.reduce((group, item) => {
		if (!item.hasOwnProperty(property)) {
			item[property] = defaultValue;
		}
		if (!group[item[property]]) {
			group[item[property]] = [];
		}
		group[item[property]].push(item);
		return group;
	}, {});

	const groups = Object.entries(grouped).map(([groupName, items]) => ({
		name: groupName,
		itemList: items,
	}));

	return groups;
}

export function fnSortByProperty(list: any[], property: string = "", order: "asc" | "desc" = "desc"): any[] {
	return list.sort((a, b) => {
		const valueA = a[property];
		const valueB = b[property];

		// Si ambos valores son cadenas, se utiliza localeCompare para comparar
		if (typeof valueA === "string" && typeof valueB === "string") {
			const comparison = valueA.localeCompare(valueB);
			return order === "asc" ? comparison : -comparison;
		} else {
			// Para números u otros tipos
			if (valueA < valueB) return order === "asc" ? -1 : 1;
			if (valueA > valueB) return order === "asc" ? 1 : -1;
			return 0;
		}
	});
}
