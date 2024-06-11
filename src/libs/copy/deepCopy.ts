type DeepArray<T> = (T | DeepArray<T>)[];

export function deepCopy<T>(arr: DeepArray<T>): DeepArray<T> {
  return arr.map(item => {
    if (Array.isArray(item)) {
      return deepCopy(item)
    } else {
      return item
    }
  })
}