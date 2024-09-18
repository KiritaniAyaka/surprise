import { crypto, type DigestAlgorithm } from "@std/crypto";
import { encodeHex } from "@std/encoding/hex";

type HashCalculator = (
  data:
    | string
    | BufferSource
    | AsyncIterable<BufferSource>
    | Iterable<BufferSource>
) => Promise<string>;

let encoder: TextEncoder | null = null;

export const createHash: (algorithm: DigestAlgorithm) => HashCalculator = (
  algorithm
) => {
  return async (data) => {
    if (typeof data === "string") {
      if (encoder === null) {
        encoder = new TextEncoder();
      }
      data = encoder.encode(data);
    }
    return encodeHex(await crypto.subtle.digest(algorithm, data));
  };
};

export const md5: HashCalculator = createHash("MD5");
export const sha1: HashCalculator = createHash("SHA-1");
export const sha256: HashCalculator = createHash("SHA-256");
