import { TerminalSpinner } from "../mod.ts";
import { Config, Process } from "../types.ts";

export async function Processor(
  process: Process,
  config: Config,
): Promise<void> {
  const terminalSpinner = new TerminalSpinner(`Running ${process.name}`);
  terminalSpinner.start();
  for (const step of process.steps.sort((a, b) => a.order - b.order)) {
    if (step.type === "bin" && step.binary) {
      let cwd = config.WORKDIR;
      if (step.path) {
        cwd += `/${step.path}`;
      }
      const cmd = new Deno.Command(step.binary, {
        args: step.command.split(" "),
        cwd: cwd,
        stdout: "piped",
        stderr: "piped",
      });

      const resp = await cmd.output();

      const err = new TextDecoder().decode(resp.stderr);
      const std = new TextDecoder().decode(resp.stderr);

      if (config.VERBOSE) {
        console.log(std);
      }

      if (resp.code !== 0) {
        throw new Error(err);
      }
    }

    if (step.type === "touch") {
      const path = `${config.WORKDIR}/${step.command}`;
      await Deno.writeTextFile(path, "");
    }

    if (step.type === "mkdir") {
      const path = `${config.WORKDIR}/${step.command}`;
      await Deno.mkdir(path, { recursive: true });
    }
  }

  terminalSpinner.succeed(`${process.name} done!`);
}
