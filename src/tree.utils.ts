export abstract class IterableTree {
	children!: IterableTree[];

	[Symbol.iterator] = function* (this: any): any {
		yield this;
		for (let child of this.children) {
			yield* child;
		}
	};
}
export class TreeUtils {
	/**
	 *
	 * Build an iterable tree structure from an array.
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
		},
	) {
		type U = T & { children: U[] };
		const root: U[] = [];

		if (array) {
			const idPropertyName = options.idPropertyName;
			const parentIdPropertyName = options.parentIdPropertyName;

			const lookupMap: Map<T[K], T> = new Map();

			array.forEach((value) => {
				const key = value[idPropertyName];
				(value as any).children = [];
				lookupMap.set(key, value);
			}, new Map());

			// build the tree
			for (const node of array) {
				const currentParentId = node[parentIdPropertyName];
				const currentId = node[idPropertyName];
				const currentNode = lookupMap.get(currentId);

				if (currentParentId) {
					const currentParentNode = lookupMap.get(currentParentId);
					(currentParentNode as any).children.push(currentNode);
					continue;
				}
				root.push(currentNode as any);
			}
		}
		return root;
	}

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

		const flattenTree: T[] = [...TreeUtils.toIterator(data)];

		return flattenTree.filter((item) => predicate.apply(null, [item, criteria, property]));
	}

	public static traverse<T extends { children: T[] }>(data: T | T[], callBack: (node: T) => void, context?: any) {
		const c = context ?? this;
		if (!Array.isArray(data)) {
			callBack.apply(c, [data]);
		} else {
			data.forEach((node) => {
				callBack.apply(c, [node]);
				TreeUtils.traverse(node.children, callBack, c);
			});
		}
	}

	private static *toIterator<T extends { children: T[] }>(data: T | T[]): any {
		if (Array.isArray(data)) {
			for (const node of data) {
				yield node;
				yield* TreeUtils.toIterator(node.children);
			}
		} else {
			yield data;
			yield* TreeUtils.toIterator(data.children);
		}
	}
}
