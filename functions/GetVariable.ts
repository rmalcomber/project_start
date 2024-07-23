import { Input } from "../mod.ts";

type VarStoreType = string | (() => Promise<string>);

export const variableStore: { [id: string]: VarStoreType } = {};

export async function GetVariable(
  variableName: string,
  defaultValue?: string,
): Promise<VarStoreType> {
  const varSplit = variableName.split(":");
  const exists = variableStore[varSplit[0]];
  if (exists) {
    return exists;
  }

  let question = "";
  if (varSplit[1]) {
    question = varSplit[1];
  } else {
    question = `Enter ${varSplit[0]}`;
  }

  const resp = await Input.prompt({ message: question, default: defaultValue });

  variableStore[varSplit[0]] = resp;

  return resp;
}

export async function ReplaceVariablesInString(s: string): Promise<string> {
  const regex = /\$\{([\w | \d | \s | \: | ()]*)\}/gm;

  const resp = s.matchAll(regex);
  for (const l of resp) {
    const isFunction = l[1].includes("()");
    if (!isFunction) {
      const variable = await GetVariable(l[1]);
      s = s.replace(l[0], variable as string);
    } else {
      const fn = await GetVariable(l[1]) as (() => Promise<string>);
      const result = await fn();
      s = s.replace(l[0], result);
    }
  }

  return s;
}
