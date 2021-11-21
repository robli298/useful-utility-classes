export class TreeUtils {
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

			const nodesByKey: Map<T[K], T> =
				array.reduce((previous, current) => {
					const key = current[idPropertyName];
					(current as any).children = [];
					previous.set(key, current);
					return previous;
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
