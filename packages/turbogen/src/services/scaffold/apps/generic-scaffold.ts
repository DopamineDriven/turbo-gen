import { ConfigHandler } from "@/config/index.js";
import { PromptPropsBase } from "@/types/index.js";

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
  "name": "@${this.workspace}/web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "prettier": "@${this.workspace}/prettier-config",
  "scripts": {},
  "dependencies": {
    "@ducanh2912/next-pwa": "latest",
    "@turbogen/flags": "latest",
    "@turbogen/ui": "latest",
    "clsx": "latest",
    "next": "latest",
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
    "@types/lodash": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@vercel/analytics": "latest",
    "@vercel/edge": "latest",
    "@vercel/functions": "latest",
    "@vercel/speed-insights": "latest",
    "autoprefixer": "latest",
    "dotenv": "latest",
    "dotenv-cli": "latest",
    "dotenv-expand": "latest",
    "eslint": "latest",
    "fast-xml-parser": "latest",
    "postcss": "latest",
    "postcss-focus-visible": "latest",
    "postcss-import": "latest",
    "prettier": "latest",
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

  private get instructionsMdTemplate() {
    return `` as const;
  }

  private appPath<const F extends string>(file: F) {
    return `apps/web/${file}` as const;
  }

  private getPaths() {
    return {
      index: this.appPath("turbo.json"),
      packageJson: this.appPath("package.json"),
      eslint: this.appPath("eslint.config.mjs"),
      postcss: this.appPath("postcss.config.cjs"),
      nextconfig: this.appPath("next.config.mjs"),
      tailwind: this.appPath("tailwind.config.ts"),
      tsconfig: this.appPath("tsconfig.json"),
      nextenvdts: this.appPath("next-env.d.ts"),
      indexdts: this.appPath("index.d.ts"),
      middleware: this.appPath("src/middleware.ts"),
      gitkeep: this.appPath("src/.gitkeep"),
      rootlayout: this.appPath("src/app/layout.tsx"),
      rootpage: this.appPath("src/app/page.tsx")
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

  public exeWebApp() {
    return Promise.all([
      this.writeTarget("apps/web/turbo.json", this.turboJson),
      this.writeTarget("apps/web/package.json", this.pkgJsonTemplate)
    ]);
  }
}
