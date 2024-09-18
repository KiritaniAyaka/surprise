import { crypto, type DigestAlgorithm } from "@std/crypto";
import { encodeHex } from "@std/encoding/hex";

type HashCalculator = (str: string) => Promise<string>;

export const createHash: (algorithm: DigestAlgorithm) => HashCalculator = (
  algorithm
) => {
  return async (str) => {
    return encodeHex(
      await crypto.subtle.digest(algorithm, new TextEncoder().encode(str))
    );
  };
};

export const md5: HashCalculator = createHash("MD5");
export const sha1: HashCalculator = createHash("SHA-1");
export const sha256: HashCalculator = createHash("SHA-256");
