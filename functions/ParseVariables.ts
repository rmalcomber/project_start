import { Process } from "../types.ts";
import { ReplaceVariablesInString } from "./GetVariable.ts";

export async function ParseVariables(processes: Process[]) {
  for (const process of processes) {
    for (const step of process.steps) {
      step.command = await ReplaceVariablesInString(step.command);

      if (step.binary) {
        step.binary = await ReplaceVariablesInString(step.binary);
      }

      if (step.path) {
        step.path = await ReplaceVariablesInString(step.path);
      }
    }
  }
}
