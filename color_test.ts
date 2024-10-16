import { assertAlmostEquals, assertObjectMatch } from "@std/assert";
import { hex, rgb, hsv, hsl } from "./color.ts";

const CONVERT_TOLERANCE = 0.01;

Deno.test("color/hex-parser", () => {
  assertObjectMatch(hex("#abc"), { r: 170, g: 187, b: 204 });
});

Deno.test("color/converter/rgb2hsl", () => {
  const source = rgb({ r: 170, g: 187, b: 204 }).to("hsl");
  assertAlmostEquals(source.h, 210, CONVERT_TOLERANCE);
  assertAlmostEquals(source.s, 0.25, CONVERT_TOLERANCE);
  assertAlmostEquals(source.l, 0.73, CONVERT_TOLERANCE);
});

Deno.test("color/converter/hsl2rgb", () => {
  const source = hsl({ h: 33, s: 0.22, l: 0.44 }).to("rgb");
  assertAlmostEquals(source.r, 137, CONVERT_TOLERANCE);
  assertAlmostEquals(source.g, 115, CONVERT_TOLERANCE);
  assertAlmostEquals(source.b, 88, CONVERT_TOLERANCE);
});

Deno.test("color/converter/rgb2hsv", () => {
  const source = rgb({ r: 170, g: 187, b: 204 }).to("hsv");
  assertAlmostEquals(source.h, 210, CONVERT_TOLERANCE);
  assertAlmostEquals(source.s, 0.17, CONVERT_TOLERANCE);
  assertAlmostEquals(source.v, 0.8, CONVERT_TOLERANCE);
});

Deno.test("color/converter/hsv2rgb", () => {
  const source = hsv({ h: 33, s: 0.22, v: 0.44 }).to("rgb");
  assertAlmostEquals(source.r, 112, CONVERT_TOLERANCE);
  assertAlmostEquals(source.g, 101, CONVERT_TOLERANCE);
  assertAlmostEquals(source.b, 88, CONVERT_TOLERANCE);
});

Deno.test("color/converter/hsv2hsl", () => {
  const source = hsv({ h: 33, s: 0.22, v: 0.44 }).to("hsl");
  assertAlmostEquals(source.h, 33, CONVERT_TOLERANCE);
  assertAlmostEquals(source.s, 0.12, CONVERT_TOLERANCE);
  assertAlmostEquals(source.l, 0.39, CONVERT_TOLERANCE);
});

Deno.test("color/converter/hsl2hsv", () => {
  const source = hsl({ h: 33, s: 0.22, l: 0.44 }).to("hsv");
  assertAlmostEquals(source.h, 33, CONVERT_TOLERANCE);
  assertAlmostEquals(source.s, 0.36, CONVERT_TOLERANCE);
  assertAlmostEquals(source.v, 0.54, CONVERT_TOLERANCE);
});
