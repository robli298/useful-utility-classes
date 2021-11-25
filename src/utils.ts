export class Utils {
	public static debounce(func: Function, wait: number, immediate: boolean) {
		return function (this: any, args: any = '') {
			console.log(wait);
			console.log(immediate);
			func.apply(this, [...args]);
		};
	}
}
