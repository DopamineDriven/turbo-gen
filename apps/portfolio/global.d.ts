/// <reference types="node" />

declare global {
  type UserAgent = {
    isBot: boolean;
    ua: string;
    browser: {
      name?: string;
      version?: string;
    };
    device: {
      model?: string;
      type?: string;
      vendor?: string;
    };
    engine: {
      name?: string;
      version?: string;
    };
    os: {
      name?: string;
      version?: string;
    };
    cpu: {
      architecture?: string;
    };
  }
  namespace NodeJS {
    interface ProcessEnv {
      readonly VERCEL_ENV: "development" | "production" | "preview";
    }
  }
}

export {};
