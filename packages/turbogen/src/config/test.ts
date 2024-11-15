export const getProcess = process.env.npm_config_user_agent;

function getPackageManager() {
  if (getProcess) {
    return `pnpm@${/pnpm\/([0-9].[0-9].[0-9])/g.exec(getProcess)?.[1]}` as const;
  } else return `pnpm`;
}

console.log(getPackageManager());
