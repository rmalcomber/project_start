import { GetSchemes } from "./functions/GetSchemes.ts";
import { GetVariable } from "./functions/GetVariable.ts";
import { ParseVariables } from "./functions/ParseVariables.ts";
import { Processor } from "./functions/Processor.ts";
import { Checkbox, Select } from "./mod.ts";
import { Child, Config, Process, Scheme } from "./types.ts";

console.clear();

const startDirectory = await GetVariable(
  "startDirectory:Enter a working directory",
  Deno.cwd(),
);

const projectName = await GetVariable("projectName:Enter a project name");
const WORKDIR = `${startDirectory}/${projectName}`;

const config: Config = {
  STARTDIR: startDirectory as string,
  VERBOSE: false,
  WORKDIR,
};

await Deno.mkdir(WORKDIR, { recursive: true });

try {
  const profiles: Scheme[] = await GetSchemes();

  const profile = await Select.prompt({
    message: "Which type of profile?",
    options: profiles.map((p) => {
      return { name: p.title, value: p };
    }),
  }) as unknown as Scheme;

  const processes: Process[] = [{
    index: 0,
    name: profile.title,
    steps: profile.steps,
  }];

  // Map Options
  if (profile.options) {
    const setupOptions = await Checkbox.prompt({
      message: "Choose setup options",
      options: profile.options.map((o) => {
        return {
          name: o.title,
          value: o,
          options: o.children
            ? o.children.map((c) => {
              return {
                name: c.title,
                value: c,
              };
            })
            : null,
        };
      }),
    }) as unknown as Child[];

    for (const option of setupOptions) {
      processes.push({
        index: processes.length,
        name: option.title,
        steps: option.steps,
      });
    }
  }

  //Parse Variables
  await ParseVariables(processes);

  console.clear();
  for (let index = 0; index < processes.length; index++) {
    const process = processes[index];
    await Processor(process, config);
  }
} catch (error) {
  console.log("Cleaning Up after error: ");
  await Deno.remove(WORKDIR, { recursive: true });
  throw new Error(error);
}

console.log("Completed");
