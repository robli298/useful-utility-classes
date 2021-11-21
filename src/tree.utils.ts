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
}
