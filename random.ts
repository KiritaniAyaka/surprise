import { encodeBase64 } from "@std/encoding/base64";

type RandomCryptoOptions = {
  type?: "base64";
};

export function randomCrypto(length: number): Uint8Array;
export function randomCrypto<T extends RandomCryptoOptions>(
  length: number,
  options: T
): T extends { type: "base64" } ? string : Uint8Array;
export function randomCrypto<T extends RandomCryptoOptions>(
  length: number,
  options?: T
): Uint8Array | string {
  const arr = crypto.getRandomValues(new Uint8Array(length));
  const { type } = options || {};
  if (type === "base64") {
    return encodeBase64(arr);
  }
  return arr;
}
