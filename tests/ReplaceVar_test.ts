import { assertEquals } from "jsr:@std/assert";

import {
  ReplaceVariablesInString,
  variableStore,
} from "../functions/GetVariable.ts";
import { StringPromise } from "./test_utils.ts";

Deno.test(async function ReplaceVarTest() {
  const dateExp = new Date().toDateString();
  const aVarExp = "A Var";
  const bVarExp = "B Var";
  const cVarExp = "C Var";
  const dVarExp = dateExp;

  variableStore["aTest()"] = () => StringPromise(aVarExp);
  variableStore["bTest"] = bVarExp;
  variableStore["cTest"] = cVarExp;
  variableStore["date()"] = () => StringPromise(dVarExp);

  assertEquals(aVarExp, await ReplaceVariablesInString("${aTest()}"));
  assertEquals(bVarExp, await ReplaceVariablesInString("${bTest}"));
  assertEquals(cVarExp, await ReplaceVariablesInString("${cTest}"));
  assertEquals(dVarExp, await ReplaceVariablesInString("${date()}"));

  const resp = await ReplaceVariablesInString(
    "This is function test: ${aTest()} and regular var: ${bTest} and then var with description: ${cTest:My Description} and func with description ${date():This is a test}",
  );

  const exp =
    `This is function test: ${aVarExp} and regular var: ${bVarExp} and then var with description: ${cVarExp} and func with description ${dVarExp}`;
  assertEquals(resp, exp);

  const noVarResp = await ReplaceVariablesInString("Hello World!");
  assertEquals(noVarResp, "Hello World!");
});
