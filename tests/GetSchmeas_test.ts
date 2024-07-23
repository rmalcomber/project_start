import { assertEquals } from "jsr:@std/assert";

import { GetSchemes } from "../functions/GetSchemes.ts";
import { Scheme } from "../types.ts";

Deno.test(async function TestGetSchemas() {
  const testDirectory = "_test";
  await Deno.mkdir(testDirectory);

  const fakeSchema: Scheme = {
    name: "Name",
    description: "My Description",
    steps: [],
    title: "Title",
    version: "0.0.1",
  };

  await Deno.writeTextFile(
    `${testDirectory}/test_schema.json`,
    JSON.stringify(fakeSchema),
  );

  const schemas = await GetSchemes(testDirectory);

  assertEquals(schemas[0].name, fakeSchema.name);

  await Deno.remove(testDirectory, { recursive: true });
});
