export class TreeUtils {
	public static treeFrom<T extends { key: number | string | symbol; parentKey: number | string | symbol | null }>(
		array: T[] = []
	): T & { children: T[] } {
		return { ...array[0], ...{ children: [] } };
	}
}
