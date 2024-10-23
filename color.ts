/**
 * @module
 *
 * # Color
 *
 * Algorithm reference: [Wikipedia](https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4#%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%96%93%E7%9A%84%E8%BD%89%E6%8F%9B)
 */

/**
 * Convert RGB to HSL.
 *
 * RGB values are in the range of [0, 255].
 *
 * Returned HSL values are in the range of [0, 360) for H, [0, 1] for S and L.
 *
 * @param r Red value
 * @param g Green value
 * @param b Blue value
 * @returns A tuple of HSL values
 */
export const rgb2hsl: (
  r: number,
  g: number,
  b: number
) => [h: number, s: number, l: number] = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h,
    s,
    // deno-lint-ignore prefer-const
    l = (max + min) / 2;

  if (max === min) {
    h = 0;
  } else if (max === r && g >= b) {
    h = (60 * (g - b)) / (max - min);
  } else if (max === r && g < b) {
    h = (60 * (g - b)) / (max - min) + 360;
  } else if (max === g) {
    h = (60 * (b - r)) / (max - min) + 120;
  } else if (max === b) {
    h = (60 * (r - g)) / (max - min) + 240;
  }

  if (l === 0 || max === min) {
    s = 0;
  } else if (l > 0 && l <= 0.5) {
    s = (max - min) / (2 * l);
  } else if (l > 0.5) {
    s = (max - min) / (2 - 2 * l);
  }

  return [h!, s!, l];
};

/**
 * Convert HSL to RGB.
 *
 * HSL values are in the range of [0, 360) for H, [0, 1] for S and L.
 *
 * Returned RGB values are in the range of [0, 255].
 *
 * @param h Hue value
 * @param s Saturation value
 * @param l Lightness value
 * @returns A tuple of RGB values
 */
export const hsl2rgb: (
  h: number,
  s: number,
  l: number
) => [r: number, g: number, b: number] = (h, s, l) => {
  if (s === 0) {
    return [l * 255, l * 255, l * 255];
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = h / 360;

  const calc = (t: number) => {
    if (t < 0) {
      t += 1;
    } else if (t > 1) {
      t -= 1;
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    } else if (t < 1 / 2) {
      return q;
    } else if (t < 2 / 3) {
      return p + (q - p) * 6 * (2 / 3 - t);
    } else {
      return p;
    }
  };

  return [calc(hk + 1 / 3), calc(hk), calc(hk - 1 / 3)].map((c) =>
    Math.round(c * 255)
  ) as [number, number, number];
};

/**
 * Convert RGB to HSV.
 *
 * RGB values are in the range of [0, 255].
 *
 * Returned HSV values are in the range of [0, 360) for H, [0, 1] for S and V.
 *
 * @param r Red value
 * @param g Green value
 * @param b Blue value
 * @returns A tuple of HSV values
 */
export const rgb2hsv: (
  r: number,
  g: number,
  b: number
) => [h: number, s: number, v: number] = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s;
  if (max === min) {
    h = 0;
  } else if (max === r && g >= b) {
    h = (60 * (g - b)) / (max - min);
  } else if (max === r && g < b) {
    h = (60 * (g - b)) / (max - min) + 360;
  } else if (max === g) {
    h = (60 * (b - r)) / (max - min) + 120;
  } else if (max === b) {
    h = (60 * (r - g)) / (max - min) + 240;
  }

  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }

  return [h!, s, max];
};

/**
 * Convert HSV to RGB.
 *
 * HSV values are in the range of [0, 360) for H, [0, 1] for S and V.
 *
 * Returned RGB values are in the range of [0, 255].
 *
 * @param h Hue value
 * @param s Saturation value
 * @param v Value
 * @returns A tuple of RGB values
 */
export const hsv2rgb: (
  h: number,
  s: number,
  v: number
) => [r: number, g: number, b: number] = (h, s, v) => {
  const hi = Math.floor(h / 60);
  const f = h / 60 - hi;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  const calc = () => {
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
      default:
        throw new Error("Invalid HSV value");
    }
  };

  return calc().map((c) => Math.round(c * 255)) as [number, number, number];
};

/**
 * Convert HSL to HSV.
 *
 * H is in the range of [0, 360). Other values are in the range of [0, 1].
 *
 * @param h Hue value
 * @param s Saturation value of HSL
 * @param l Lightness value
 * @returns A tuple of HSV values
 */
export const hsl2hsv: (
  h: number,
  s: number,
  l: number
) => [h: number, s: number, v: number] = (h, s, l) => {
  const v = l + s * Math.min(l, 1 - l);

  let sv: number;
  if (v === 0) {
    sv = 0;
  } else {
    sv = 2 * (1 - l / v);
  }

  return [h, sv, v];
};

/**
 * Convert HSV to HSL.
 *
 * H is in the range of [0, 360). Other values are in the range of [0, 1].
 *
 * @param h Hue value
 * @param s Saturation value of HSV
 * @param v Value
 * @returns A tuple of HSL values
 */
export const hsv2hsl: (
  h: number,
  s: number,
  v: number
) => [h: number, s: number, l: number] = (h, s, v) => {
  const l = v * (1 - s / 2);

  let sl: number;
  if (l === 0 || l === 1) {
    sl = 0;
  } else {
    sl = (v - l) / Math.min(l, 1 - l);
  }

  return [h, sl, l];
};

type Data<T extends string> = {
  [K in T extends `${infer First}${infer _}` ? First : never]: number;
} & (T extends `${infer _}${infer Rest}`
  ? Data<Rest>
  : // deno-lint-ignore ban-types
    {});

type Source<
  K extends string,
  T extends string = Exclude<"rgb" | "hsl" | "hsv", K>
> = Data<K> & {
  to: <Target extends T>(target: Target) => Source<Target>;
};

type RGBSource = Source<"rgb"> & {
  hex: () => string;
};
type HSLSource = Source<"hsl">;
type HSVSource = Source<"hsv">;

const withRGBOperators: (o: {
  r: number;
  g: number;
  b: number;
}) => RGBSource = ({ r, g, b }) => ({
  r,
  g,
  b,
  to<Target extends string>(target: Target): Source<Target> {
    if (target === "hsl") {
      const [h, s, l] = rgb2hsl(r, g, b);
      return withHSLOperators({ h, s, l }) as unknown as Source<Target>;
    } else if (target === "hsv") {
      const [h, s, v] = rgb2hsv(r, g, b);
      return withHSVOperators({ h, s, v }) as unknown as Source<Target>;
    }
    throw new Error(`Unsupported color space conversion: RGB to ${target}`);
  },
  hex() {
    const [r, g, b] = [this.r, this.g, this.b].map((c) =>
      Math.round(c).toString(16).padStart(2, "0")
    );
    return `#${r}${g}${b}`;
  },
});

const withHSLOperators: (o: {
  h: number;
  s: number;
  l: number;
}) => HSLSource = ({ h, s, l }): HSLSource => ({
  h,
  s,
  l,
  to<Target extends string>(target: Target): Source<Target> {
    if (target === "rgb") {
      const [r, g, b] = hsl2rgb(h, s, l);
      return withRGBOperators({ r, g, b }) as unknown as Source<Target>;
    } else if (target === "hsv") {
      const [hv, sv, v] = hsl2hsv(h, s, l);
      return withHSVOperators({
        h: hv,
        s: sv,
        v,
      }) as unknown as Source<Target>;
    }
    throw new Error(`Unsupported color space conversion: HSL to ${target}`);
  },
});

const withHSVOperators: (o: {
  h: number;
  s: number;
  v: number;
  a?: number;
}) => HSVSource = ({ h, s, v, a = 255 }) => ({
  h,
  s,
  v,
  a,
  to<Target extends string>(target: Target): Source<Target> {
    if (target === "rgb") {
      const [r, g, b] = hsv2rgb(h, s, v);
      return withRGBOperators({ r, g, b }) as unknown as Source<Target>;
    } else if (target === "hsl") {
      const [hl, sl, l] = hsv2hsl(h, s, v);
      return withHSLOperators({
        h: hl,
        s: sl,
        l,
      }) as unknown as Source<Target>;
    }
    throw new Error(`Unsupported color space conversion: HSV to ${target}`);
  },
});

/**
 * Parse hex color code to RGB color source object.
 * @param hex A string of hex color code
 * @returns Parsed RGB color source object
 */
export const hex = (hex: string): RGBSource => {
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return withRGBOperators({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  });
};

/**
 * Create a RGB color source object.
 * @param r Red value or an object containing red, green and blue
 * @param g Green value
 * @param b Blue value
 * @returns RGB color source object
 */
export const rgb: {
  (r: number, g: number, b: number): RGBSource;
  (o: { r: number; g: number; b: number }): RGBSource;
} = (
  inputObjOrRed: number | { r: number; g: number; b: number },
  g?: number,
  b?: number
) => {
  if (typeof inputObjOrRed === "number") {
    return withRGBOperators({
      r: inputObjOrRed,
      g: g!,
      b: b!,
    });
  } else {
    return withRGBOperators(inputObjOrRed);
  }
};

/**
 * Create a HSL color source object.
 * @param h Hue value or an object containing hue, saturation, lightness
 * @param s Saturation value
 * @param l Lightness value
 * @returns HSL color source object
 */
export const hsl: {
  (h: number, s: number, l: number): HSLSource;
  (o: { h: number; s: number; l: number }): HSLSource;
} = (
  inputObjOrHue: number | { h: number; s: number; l: number },
  s?: number,
  l?: number
) => {
  if (typeof inputObjOrHue === "number") {
    return withHSLOperators({
      h: inputObjOrHue,
      s: s!,
      l: l!,
    });
  } else {
    return withHSLOperators(inputObjOrHue);
  }
};

/**
 * Create a HSV color source object.
 * @param h Hue value or an object containing hue, saturation, value
 * @param s Saturation value
 * @param v Value
 * @returns HSV color source object
 */
export const hsv: {
  (h: number, s: number, v: number): HSVSource;
  (o: { h: number; s: number; v: number }): HSVSource;
} = (
  inputObjOrHue: number | { h: number; s: number; v: number },
  s?: number,
  v?: number
) => {
  if (typeof inputObjOrHue === "number") {
    return withHSVOperators({
      h: inputObjOrHue,
      s: s!,
      v: v!,
    });
  } else {
    return withHSVOperators(inputObjOrHue);
  }
};
