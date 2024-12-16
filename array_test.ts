import { assert } from "@std/assert";
import { findPositions } from "./array.ts";

Deno.test("array/findPositions/2d", () => {
  const arr = [
    [1, 2, 3],
    [3, 1, 2],
    [2, 3, 1],
  ];
  const target = 3;
  const result = findPositions(arr, target);
  for (const pos of result) {
    assert(arr[pos[0]][pos[1]] === target);
  }
  // Destructuring also works
  const [[x, y]] = findPositions(arr, target);
  assert(arr[x][y] === target);
});

Deno.test("array/findPositions/3d", () => {
  const arr = [
    [[1, 2, 3], [2, 4, 3]],
    [[3, 1, 2], [2, 1, 5]],
    [[2, 3, 1], [3, 1, 2]],
  ];
  const target = 3;
  const result = findPositions(arr, target);
  for (const pos of result) {
    assert(arr[pos[0]][pos[1]][pos[2]] === target);
  }
  // Destructuring also works
  const [[x, y, z]] = findPositions(arr, target);
  assert(arr[x][y][z] === target);
});
