export const onChangeArrayObjProp = (
  fn: Function,
  array: any[],
  index: number,
  prop: string,
  value: any
) => {
  array[index][prop] = value
  return fn([...array])
}
