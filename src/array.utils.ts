export class ArrayUtils {
  public static binarySearch<T>(a: T[], v: T): number {
    let s = 0;
    let e = a.length - 1;
    let m = Math.floor(a.length / 2);

    do  {
      if (v === a[m]) {
        return m;
      } else if (v > a[m]) {
        s = m + 1;
      } else {
        e = m - 1;
      }
      m = Math.floor((s + e) / 2);
    } while (s <= e)

    return -1;
  }
}
