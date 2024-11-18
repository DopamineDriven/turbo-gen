# @d0paminedriven/turbogen

Generate a pnpm workspace powered by turborepo ft essential tooling repos as workspace packages and a nextjs web app starter as icing on the cake

Simply run `pnpm ddturobgen init` from your cli

### Installation

```bash
pnpm install @d0paminedriven/turbogen
```

### Usage

```bash
pnpm ddturbogen init
```

Run `pnpm init` in a new repo and install the package. 


```bash
dopaminedriven@LAPTOP-2IH011V4:~/wcd/faderoom-github/faderoom$ pnpm install
Packages: +44
++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 44, reused 43, downloaded 1, added 44, done

devDependencies:
+ @d0paminedriven/turbogen 0.1.0

Done in 1.3s
```


Once installed, your `package.json` file should look similar to the following

```json
{
  "name": "example-repo",
  "version": "1.0.0",
  "description": "",
  "devDependencies": {
    "@d0paminedriven/turbogen": "^0.1.0"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

Now run the `pnpm ddturbogen init` command (ddturbogen = dopamine driven turbogen 🌚)

There are two prompts to answer, shown below

```bash
dopaminedriven@LAPTOP-2IH011V4:~/wcd/faderoom-github/faderoom$ pnpm ddturbogen init
~ Enter your desired workspace name (eg, acme for an `@acme/*` naming convention) faderoom
~ Which port should be used for your nextjs web application? 3001
```



Once finished, your entire workspace is instantly generated, tooling is configured, and a web app is ready to go. Your locally installed version of pnpm is also parsed and included in your root `package.json` file

Now, your root `package.json` should look similar to the following


```json
{
  "name": "@faderoom/root",
  "license": "MIT",
  "private": true,
  "packageManager": "pnpm@9.13.2",
  "scripts": {
    "build:web": "turbo build --filter=@faderoom/web",
    "changeset": "changeset",
    "clean": "git clean -xdf node_modules",
    "dev": "turbo dev --parallel --continue",
    "format": "prettier --write \"**/*.{ts,tsx,cts,mts,js,jsx,mjs,cjs,json,yaml,yml,css,html,md,mdx}\" --ignore-unknown --cache",
    "lint": "turbo lint",
    "prepare": "husky",
    "typecheck": "turbo typecheck",
    "clean:house": "cd apps/web && git clean -xdf node_modules .next .turbo  && cd ../..tooling/eslint && git clean -xdf node_modules .turbo && cd ../prettier && git clean -xdf node_modules .turbo && cd ../typescript && git clean -xdf .turbo node_modules && cd ../jest-presets && git clean -xdf node_modules .turbo && cd ../.. && git clean -xdf node_modules pnpm-lock.yaml && pnpm install",
    "generate:base64": "openssl rand -base64 64",
    "generate:hex": "openssl rand -hex 64",
    "npm:registry": "npm set registry https://registry.npmjs.org",
    "run:web": "turbo dev --filter=@faderoom/web",
    "sync:time": "sudo ntpdate time.windows.com",
    "latest:pnpm": "corepack use pnpm@latest",
    "update:pnpm": "curl -fsSL https://get.pnpm.io/install.sh | sh -"
  },
  "devDependencies": {
    "@changesets/cli": "latest",
    "@faderoom/eslint-config": "workspace:*",
    "@faderoom/prettier-config": "workspace:*",
    "@faderoom/tsconfig": "workspace:*",
    "@d0paminedriven/turbogen": "latest",
    "@total-typescript/ts-reset": "latest",
    "@types/node": "latest",
    "dotenv": "latest",
    "dotenv-cli": "latest",
    "dotenv-expand": "latest",
    "eslint": "latest",
    "husky": "latest",
    "prettier": "latest",
    "tsx": "latest",
    "turbo": "latest",
    "typescript": "latest",
    "vercel": "latest"
  },
  "prettier": "@faderoom/prettier-config",
  "engines": {
    "node": ">=20",
    "npm": ">=10",
    "pnpm": ">=9"
  }
}
```

### An important Final step -- run install again from the root

I recommend using the generated corepack script to keep pnpm running at its latest version by running

```bash
pnpm latest:pnpm
```

The command being executed here is

```bash
corepack use pnpm@latest
```

after the corepack command has been run the `packageManager` field in your `package.json` file should look similar to the following

```json
{
  "packageManager": "pnpm@9.13.2+sha512.88c9c3864450350e65a33587ab801acf946d7c814ed1134da4a924f6df5a2120fd36b46aab68f7cd1d413149112d53c7db3a4136624cfd00ff1846a0c6cef48a",
}
```

This also recursively runs an install for all dependencies in your workspace

### The `tooling` packages

Each package in the tooling directory is a local workspace-only package. These include eslint, jest, prettier, and typescript utilities

Notice that in your root `package.json` file three of the four packages are referenced in your `devDependencies` (faderoom just happens to be the name I used for this workspace)

```json

{
  "devDependencies": {
    "@faderoom/eslint-config": "workspace:*",
    "@faderoom/prettier-config": "workspace:*",
    "@faderoom/tsconfig": "workspace:*"
  }
}
```


### Run the web app from the get-go

After successfully installing your dependencies by running `pnpm install` or `pnpm latest:pnpm` from the root, run the command to fire up the dev server of the nextjs web app

```bash
pnpm run:web
```


