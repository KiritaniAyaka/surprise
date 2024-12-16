type ElementType<T> = T extends Array<infer U> ? ElementType<U> : T;
type ArrayDimensions<T> = T extends Array<infer U>
  ? [number, ...ArrayDimensions<U>]
  : [];

export function* findPositions<T extends Array<unknown>>(
  arr: T,
  target: ElementType<T>,
): Generator<ArrayDimensions<T>, void, unknown> {
  function* _find(
    subarr: unknown,
    curPosition: number[] = [],
  ): Generator<ArrayDimensions<T>, void, unknown> {
    if (!Array.isArray(subarr)) return;
    for (let i = 0; i < subarr.length; i++) {
      if (Array.isArray(subarr[i])) {
        yield* _find(subarr[i], [...curPosition, i]);
      } else if (Object.is(subarr[i], target)) {
        yield [...curPosition, i] as ArrayDimensions<T>;
      }
    }
  }

  yield* _find(arr);
}
