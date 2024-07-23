import { stub } from "https://deno.land/std@0.224.0/testing/mock.ts";
import { assertEquals } from "jsr:@std/assert";

import { GetVariable } from "../functions/GetVariable.ts";
import { Input } from "../mod.ts";
import { StringPromise } from "./test_utils.ts";

Deno.test(async function GetVarTest() {
  const expected = "Hello World!";

  stub(Input, "prompt", () => StringPromise(expected));

  const value = await GetVariable("test_var");

  assertEquals(value, expected);
});
