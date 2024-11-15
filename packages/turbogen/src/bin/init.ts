#!/usr/bin/env node
import * as inquirer from "@inquirer/prompts";
import type { PromptPropsBase } from "@/types/index.js";
import { ConfigHandler } from "@/config/index.js";
import { cliService } from "@/services/cli/index.js";
import { scaffoldService } from "@/services/scaffold/index.js";

export async function testInquirer() {
  const { i } = cliService(process.cwd(), inquirer.select, inquirer.input);
  return i.executeInquirer();
}

export async function testArgs(argv: string[]) {
  const handler = new ConfigHandler(process.cwd());
  const userAgent = process.env.npm_config_user_agent;

  const fileSize = handler.fileSizeMb(argv[3] ?? "./package.json");
  const templated = `file ${argv[3]} is ${fileSize} mb. your package manager is ${userAgent}`;

  console.log(templated);
  return;
}

export async function xrWorkspace(obj: PromptPropsBase) {
  const { i } = cliService(process.cwd(), inquirer.select, inquirer.input);
  const configWorkup = await i.executeConditional(obj);

  try {
    return [
      i.templatedYaml(configWorkup),
      i.handleAuthProvider(configWorkup)
    ] as const;
  } catch (err) {
    console.error(typeof err === "string" ? err : JSON.stringify(err, null, 2));
  }
}

if (process.argv[2] === "test") {
  Promise.all([testArgs(process.argv)]);
}

if (process.argv[2] === "init") {
  Promise.all([
    testInquirer().then(async v => {
      const { xr, eslint, jest, prettier, root, typescript } = scaffoldService(
        process.cwd(),
        v
      );
      eslint.exeEslint();
      jest.exeJestPresets();
      prettier.exePrettier();
      typescript.exeTs();
      root.exeRoot();
      if (v.isXr === true) {
        return await xrWorkspace(v).then(async data => {
          if (data) {
            return xr.exeXrApp(data[0], data[1]);
          } else {
            const { i } = cliService(
              process.cwd(),
              inquirer.select,
              inquirer.input
            );
            const configWorkup = await i.executeConditional(v);
            return xr.exeXrApp(
              i.templatedYaml(configWorkup),
              i.handleAuthProvider(configWorkup)
            );
          }
        });
      }
      return v;
    })
  ]);
}
