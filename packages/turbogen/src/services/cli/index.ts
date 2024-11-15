import { InquirerService } from "./inquirer.js";

export interface CliServiceProps {
  i: InquirerService;
}

export function cliService(
  cwd: string,
  select: typeof import("@inquirer/prompts").select,
  input: typeof import("@inquirer/prompts").input
) {
  return {
    i: new InquirerService(cwd, select, input)
  };
}
