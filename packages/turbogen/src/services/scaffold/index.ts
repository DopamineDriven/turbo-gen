import type { PromptPropsBase } from "@/types/index.js";
import { XrAppScaffolder } from "./apps/xr-scaffold.js";
import { RootScaffolder } from "./root/root-scaffolder.js";
import { EslintScaffolder } from "./tooling/eslint-scaffold.js";
import { JestScaffolder } from "./tooling/jest-scaffold.js";
import { PrettierScaffolder } from "./tooling/prettier-scaffold.js";
import { TsScaffolder } from "./tooling/ts-scaffold.js";

export interface ScaffoldServiceProps {
  eslint: EslintScaffolder;
  jest: JestScaffolder;
  prettier: PrettierScaffolder;
  root: RootScaffolder;
  typescript: TsScaffolder;
  xr: XrAppScaffolder;
}

export function scaffoldService(cwd: string, promptBase: PromptPropsBase) {
  return {
    eslint: new EslintScaffolder(cwd, promptBase),
    jest: new JestScaffolder(cwd, promptBase),
    prettier: new PrettierScaffolder(cwd, promptBase),
    root: new RootScaffolder(cwd, promptBase),
    typescript: new TsScaffolder(cwd, promptBase),
    xr: new XrAppScaffolder(cwd, promptBase)
  };
}
