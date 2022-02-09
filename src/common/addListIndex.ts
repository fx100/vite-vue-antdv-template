export function addListIndex(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list?: any[],
  current = 1,
  pageSize = 10,
) {
  list?.forEach((item: { index: number }, index: number) => {
    item.index = pageSize * (current - 1) + index + 1
  })
}

export default addListIndex
