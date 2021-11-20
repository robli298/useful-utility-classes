export class TreeUtils {
	public static treeFrom<T, K extends keyof T>(
		array: T[],
		options: {
			keyProperty: K;
			parentKeyProperty: K;
		}
	) {}
}
