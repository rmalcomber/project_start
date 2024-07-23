import { Scheme } from "../types.ts";

const SchemaFolder = "schemas";

export async function GetSchemes(
  schemaFolder: string = SchemaFolder,
): Promise<Scheme[]> {
  const profiles: Scheme[] = [];

  for await (const f of Deno.readDir(schemaFolder)) {
    if (f.isFile && f.name.endsWith("schema.json")) {
      const text = await Deno.readTextFile(`${schemaFolder}/${f.name}`);
      profiles.push(JSON.parse(text));
    }
  }
  return profiles;
}
