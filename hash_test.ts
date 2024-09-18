import { assertEquals } from "@std/assert";
import { md5, sha1, sha256 } from "./mod.ts";

Deno.test("hash/MD5", async () => {
  assertEquals(
    await md5("這是等會要用到的妙妙工具~"),
    "22236315b45571dca4f335566c787910"
  );
});

Deno.test("hash/SHA-1", async () => {
  assertEquals(
    await sha1("這是等會要用到的妙妙工具~"),
    "3b012008391f0cdb57a9ae89ab35472235adaffc"
  );
});

Deno.test("hash/SHA-256", async () => {
  assertEquals(
    await sha256("這是等會要用到的妙妙工具~"),
    "72e8a603394882a067ba69c0b8ce250635e5bce0e9c9340d5453f005a31702d8"
  );
});
