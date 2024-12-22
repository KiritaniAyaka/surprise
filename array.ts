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

type General<T> = T extends number ? number
  : T extends string ? string
  : T extends boolean ? boolean
  : T extends bigint ? bigint
  : T extends symbol ? symbol
  : T extends null ? null
  : T extends undefined ? undefined
  : T;

type ArrayOfDimension<E = unknown, L extends number[] = number[], O = E> =
  L extends [infer _, ...infer Rest] ? Rest["length"] extends 0 ? Array<O>
    : Rest extends number[] ? Array<ArrayOfDimension<E, Rest, O>>
    : never
    : never;

export function createDeepArray<T, L extends number[]>(
  zeroValueOrGetter: T | (() => T),
  ...lengths: L
): ArrayOfDimension<T, L, General<T>> {
  const [outermost, ...rest] = lengths;
  const zeroValue = typeof zeroValueOrGetter === "function"
    ? (zeroValueOrGetter as () => T)()
    : zeroValueOrGetter;

  if (rest.length) {
    return Array.from({ length: outermost }).map(() =>
      createDeepArray(zeroValue, ...rest)
    ) as ArrayOfDimension<T, L, General<T>>;
  }
  return Array.from({ length: outermost }).fill(zeroValue) as ArrayOfDimension<
    T,
    L,
    General<T>
  >;
}
