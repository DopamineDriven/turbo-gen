import type { PromptPropsBase } from "@/types/index.js";
import { ConfigHandler } from "@/config/index.js";

export class XrAppScaffolder extends ConfigHandler {
  constructor(
    public override cwd: string,
    public baseProps: PromptPropsBase
  ) {
    super((cwd ??= process.cwd()));
  }

  private get workspace() {
    return this.baseProps.workspace;
  }

  private get turboJson() {
    // prettier-ignore
    return `{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}` as const;
  }

  private get pkgJsonTemplate() {
    // prettier-ignore
    return `{
  "name": "@${this.workspace}/xr",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "prettier": "@${this.workspace}/prettier-config",
  "scripts": {},
  "dependencies": {
    "@ducanh2912/next-pwa": "latest",
    "@turbogen/ui": "latest",
    "@turbogen/xr": "latest",
    "cloudinary": "latest",
    "clsx": "latest",
    "next": "latest",
    "next-auth": "latest",
    "next-sitemap": "latest",
    "react": "latest",
    "react-dom": "latest",
    "react-intersection-observer": "latest",
    "react-wrap-balancer": "latest",
    "suspend-react": "latest",
    "swr": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@edge-runtime/cookies": "latest",
    "@edge-runtime/types": "latest",
    "@${this.workspace}/eslint-config": "workspace:*",
    "@${this.workspace}/prettier-config": "workspace:*",
    "@${this.workspace}/tsconfig": "workspace:*",
    "@tailwindcss/forms": "latest",
    "@tailwindcss/typography": "latest",
    "@types/cli-progress": "latest",
    "@types/google.analytics": "latest",
    "@types/gtag.js": "latest",
    "@types/js-cookie": "latest",
    "@types/jsonwebtoken": "latest",
    "@types/lodash": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@vercel/analytics": "latest",
    "@vercel/edge": "latest",
    "@vercel/functions": "latest",
    "@vercel/og": "latest",
    "@vercel/speed-insights": "latest",
    "@webcomponents/template-shadowroot": "latest",
    "autoprefixer": "latest",
    "chalk": "latest",
    "chokidar": "latest",
    "cli-progress": "latest",
    "dotenv": "latest",
    "dotenv-cli": "latest",
    "dotenv-expand": "latest",
    "eslint": "latest",
    "eventsource-parser": "latest",
    "fast-xml-parser": "latest",
    "postcss": "latest",
    "postcss-focus-visible": "latest",
    "postcss-import": "latest",
    "prettier": "latest",
    "quicktype-core": "latest",
    "schema-dts": "latest",
    "sharp": "latest",
    "tailwindcss": "latest",
    "tslib": "latest",
    "tsx": "latest",
    "typescript": "latest",
    "urlpattern-polyfill": "latest",
    "webpack": "latest"
  }
}
` as const;
  }

  private get gitkeepTemplate() {
    return `\n` as const;
  }

  private appPath<const F extends string>(file: F) {
    return `apps/xr/${file}` as const;
  }

  private getPaths() {
    return {
      gitkeep: this.appPath("src/.gitkeep"),
      index: this.appPath("turbo.json"),
      packageJson: this.appPath("package.json"),
      config: this.appPath("xr.config.yaml"),
      env: this.appPath(".env")
    } as const;
  }

  private appTarget<const V extends keyof ReturnType<typeof this.getPaths>>(
    target: V
  ) {
    return this.getPaths()[target];
  }

  private writeTarget<
    const T extends ReturnType<typeof this.appTarget>,
    const V extends string
  >(target: T, template: V) {
    return this.withWs({
      path: target,
      data: template,
      cwd: this.cwd
    });
  }

  public exeXrApp(config: string, env: string) {
    return Promise.all([
      this.writeTarget("apps/xr/src/.gitkeep", this.gitkeepTemplate),
      this.writeTarget("apps/xr/turbo.json", this.turboJson),
      this.writeTarget("apps/xr/package.json", this.pkgJsonTemplate),
      this.writeTarget("apps/xr/xr.config.yaml", config),
      this.writeTarget("apps/xr/.env", env)
    ]);
  }
}
