export class TreeUtils {
	/**
	 *
	 * Build a tree structure from an array.
	 *
	 * @param array data source array.
	 * @param options - { idPropertyName, parentIdPropertyName }, the properties to be used as a link among the nodes.
	 * @returns tree like object built from array given.
	 */
	public static treeFrom<T, K extends keyof T>(
		array: T[],
		options: {
			idPropertyName: K;
			parentIdPropertyName: K;
		}
	) {
		type U = T & { children: U[] };
		const root: U[] = [];

		if (array) {
			const idPropertyName = options.idPropertyName;
			const parentIdPropertyName = options.parentIdPropertyName;

			const nodesByKey: Map<T[K], T> = new Map();
			array.forEach((value) => {
				const key = value[idPropertyName];
				(value as any).children = [];
				nodesByKey.set(key, value);
			}, new Map());

			for (const node of array) {
				const currentParentKey = node[parentIdPropertyName];
				const currentKey = node[idPropertyName];
				const currentNode = nodesByKey.get(currentKey);

				if (currentParentKey) {
					const currentParentNode = nodesByKey.get(currentParentKey);
					(currentParentNode as any).children.push(currentNode);
					continue;
				}
				root.push(currentNode as any);
			}
		}
		return root;
	}

	// TODO search for most efficient way to search on tree
	// TODO check any open library
	// TODO that is a slow solution

	/**
	 * It searches through tree structure given.
	 *
	 *  NOTE #1: I'm using concat instead of spread operator because concat is faster, most probably due it benefits from array specific optimizations, while spread operator has to conform to the common iteration protocol.
	 *
	 * NOTE #2: I'm using String() because it is the most explicit and it make easier to other people follow intention of my code. In addition to it, it throws no error for null or undefined.
	 *
	 * @template T
	 * @template P
	 * @param data
	 * @param property
	 * @param criteria
	 *
	 * @returns array of elements matched the criteria given.
	 */
	public static searchBy<T extends { children: T[] }, P extends keyof T>(data: T | T[], property: P, criteria: string): T[] {
		const predicate = (i: any, c: any, p: any) => String(i[p]).includes(c);

		let elementsFound: T[] = [];

		if (!Array.isArray(data)) {
			if (predicate.apply(null, [data, criteria, property])) {
				elementsFound.push(data);
			}
			elementsFound = elementsFound.concat(TreeUtils.searchBy(data.children, property, criteria));
		} else {
			data.forEach((value) => {
				if (predicate.apply(null, [value, criteria, property])) {
					elementsFound.push(value);
				}
				elementsFound = elementsFound.concat(TreeUtils.searchBy(value.children, property, criteria));
			});
		}
		return elementsFound;
	}
}
