export class Utils {
	public static debounce(func: Function, wait: number, immediate: boolean = false) {
		let timeout: any;
		return function (this: any, args: any = '') {
			if (!immediate) {
				clearInterval(timeout);
				timeout = setTimeout(() => {
					func.apply(this, [...args]);
				}, wait);
				return;
			}
			func.apply(this, [...args]);
		};
	}
}