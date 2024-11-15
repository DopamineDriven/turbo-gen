import type { PromptPropsBase } from "@/types/index.js";
import { ConfigHandler } from "@/config/index.js";

export class InquirerService extends ConfigHandler {
  constructor(
    public override cwd: string,
    public select: typeof import("@inquirer/prompts").select,
    public input: typeof import("@inquirer/prompts").input
  ) {
    super((cwd ??= process.cwd()));
  }

  public async answer() {
    const answers = {
      workspace: await this.input({
        theme: { prefix: "~" },
        message:
          "Enter your workspace name (eg, acme for an `@acme/*` naming convention)",
        required: true
      }),
      isXr: await this.select({
        message: "is this an xr project workspace?",
        choices: [
          { name: "yes", value: true },
          { name: "no", value: false }
        ],
        theme: { prefix: "~" }
      })
    };
    return answers;
  }

  public templatedYaml<
    const T extends {
      workspace: string;
      isXr: boolean;
      cloudinaryRootFolder: string;
      localUrl: string;
      previewUrl: string;
      prodUrl: string;
      description: string;
      title: string;
      auth: string;
      ga: string;
    }
  >({
    workspace: _workspace,
    isXr,
    cloudinaryRootFolder,
    localUrl,
    previewUrl,
    prodUrl,
    auth,
    description,
    ga: _ga,
    title
  }: T) {
    if (isXr === true) {
      const parse3dVistaDomain = prodUrl.split(/https?:\/\//)?.[1] ?? "";
      // prettier-ignore
      return `# yaml-language-server: $schema=https://tddocs.vercel.app/xr.config.json
$schema: https://tddocs.vercel.app/xr.config.json
cloudinaryApiKey: \${CLOUDINARY_API_KEY}
cloudinaryApiSecret: \${CLOUDINARY_API_SECRET}
cloudinaryRootFolder: ${cloudinaryRootFolder}
default3dVistaDomain: ${parse3dVistaDomain}
defaultLocalUrl: http://localhost:${localUrl}
defaultPreviewUrl: ${previewUrl}
defaultProductionUrl: ${prodUrl}
packageManager: pnpm
projectDescription: ${description}
projectTitle: ${title}
scopes: openid profile email
siteTheme: E1242A
withAuth: ${auth}
withGA: true
withTurbo: true
turboGenerated: true
`
    } else return ``;
  }

  private dotEnvTemplateAzure<
    const T extends {
      workspace: string;
      isXr: boolean;
      cloudinaryRootFolder: string;
      localUrl: string;
      previewUrl: string;
      prodUrl: string;
      description: string;
      title: string;
      auth: string;
      ga: string;
    }
  >(promptProps: T) {
    // prettier-ignore
    return `## Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=takeda
CLOUDINARY_URL=cloudinary://$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET@takeda/assets-dam.takeda.com?cname=assets-dam.takeda.com

## NEXTAUTH - ONLY USE THE NEXTAUTH_URL SECRET LOCALLY, DO NOT ADD TO PREVIEW OR PROD ENVIRONMENTS
NEXTAUTH_URL=http://localhost:${promptProps.localUrl}
AZURE_AD_CLIENT_SECRET=
AZURE_AD_CLIENT_ID=
AZURE_AD_TENANT_ID=
AZURE_AD_CLIENT_SECRET_ID=
### use the command "openssl rand -base64 32" in the terminal or navigate to  https://generate-secret.vercel.app/32 to generate a secret
NEXTAUTH_SECRET=

## Google Analytics - retrieve GA_STREAM_ID from the GA project credentials under "data streams"
NEXT_PUBLIC_GA_MEASUREMENT_ID=${promptProps.ga}
GA_MEASUREMENT_ID=${promptProps.ga}
NEXT_PUBLIC_GA_STREAM_ID=
GA_STREAM_ID=
`
  }

  private dotEnvTemplateOkta<
    const T extends {
      workspace: string;
      isXr: boolean;
      cloudinaryRootFolder: string;
      localUrl: string;
      previewUrl: string;
      prodUrl: string;
      description: string;
      title: string;
      auth: string;
      ga: string;
    }
  >(promptProps: T) {
    // prettier-ignore
    return `## Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=takeda
CLOUDINARY_URL=cloudinary://$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET@takeda/assets-dam.takeda.com?cname=assets-dam.takeda.com

## NEXTAUTH - ONLY USE THE NEXTAUTH_URL SECRET LOCALLY, DO NOT ADD TO PREVIEW OR PROD ENVIRONMENTS
NEXTAUTH_URL=http://localhost:${promptProps.localUrl}
OKTA_CLIENT_ID=
OKTA_CLIENT_SECRET=
OKTA_ISSUER=https://takeda.okta.com/oauth2/default
### Example OKTA_REDIRECT url https://quest.everydayai.mytakeda.com/*
OKTA_REDIRECT=
### AUDIENCE and OKTA_CLIENT_ID have the same value
AUDIENCE=
### use the command "openssl rand -base64 32" in the terminal or navigate to  https://generate-secret.vercel.app/32 to generate a secret
NEXTAUTH_SECRET=

## Google Analytics - retrieve GA_STREAM_ID from the GA project credentials under "data streams"
NEXT_PUBLIC_GA_MEASUREMENT_ID=${promptProps.ga}
GA_MEASUREMENT_ID=${promptProps.ga}
NEXT_PUBLIC_GA_STREAM_ID=
GA_STREAM_ID=
`
  }

  private dotEnvTemplateNoAuth<
    const T extends {
      workspace: string;
      isXr: boolean;
      cloudinaryRootFolder: string;
      localUrl: string;
      previewUrl: string;
      prodUrl: string;
      description: string;
      title: string;
      auth: string;
      ga: string;
    }
  >(promptProps: T) {
    // prettier-ignore
    return `## Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=takeda
CLOUDINARY_URL=cloudinary://$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET@takeda/assets-dam.takeda.com?cname=assets-dam.takeda.com

## Google Analytics - retrieve GA_STREAM_ID from the GA project credentials under "data streams"
NEXT_PUBLIC_GA_MEASUREMENT_ID=${promptProps.ga}
GA_MEASUREMENT_ID=${promptProps.ga}
NEXT_PUBLIC_GA_STREAM_ID=
GA_STREAM_ID=
`
  }

  public handleAuthProvider<
    const T extends {
      workspace: string;
      isXr: boolean;
      cloudinaryRootFolder: string;
      localUrl: string;
      previewUrl: string;
      prodUrl: string;
      description: string;
      title: string;
      auth: string;
      ga: string;
    }
  >(provider: T) {
    if (provider.auth === "AD") {
      return this.dotEnvTemplateAzure(provider);
    } else if (provider.auth === "Okta") {
      return this.dotEnvTemplateOkta(provider);
    } else return this.dotEnvTemplateNoAuth(provider);
  }

  public async isXr(obj: PromptPropsBase) {
    const configGenerator = {
      cloudinaryRootFolder: await this.input({
        message: "what is the root cloudinary folder for the xr project?",
        theme: { prefix: "~" }
      }),
      localUrl: await this.input({
        message: "what port should be used locally? (eg, 3003)",
        theme: { prefix: "~" }
      }),
      previewUrl: await this.input({
        message:
          "what is the designated preview or staging url for the xr project? value should start with https://",
        theme: { prefix: "~" }
      }),
      prodUrl: await this.input({
        message:
          "what is the designated production url for the xr project? value should start with https://",
        theme: { prefix: "~" }
      }),
      description: await this.input({
        message: "what is the project description? (metadata purposes)",
        theme: { prefix: "~" }
      }),
      title: await this.input({
        message: "what is the project title?",
        theme: { prefix: "~" }
      }),
      auth: await this.select({
        message: "Which auth provider will be used?",
        theme: { prefix: "~" },
        choices: [
          { name: "Azure Active Directory", value: "AD" },
          { name: "Okta", value: "Okta" },
          { name: "None", value: "None" }
        ]
      }),
      ga: await this.input({
        message:
          "What is the google analytics tag for this project? The GA4 value should begin with `G-`",
        theme: { prefix: "~" },
        required: true
        // validate(value) {
        //   return /G-/.test(value.substring(0,2)) === true ? true : false
        // },
      }),
      ...obj
    };

    return configGenerator;
  }

  public executeConditional(obj: PromptPropsBase) {
    return this.isXr(obj);
  }

  public executeInquirer() {
    return this.answer();
  }
}
