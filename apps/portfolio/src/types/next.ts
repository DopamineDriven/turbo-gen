import type { Unenumerate } from "@/types/helpers";

export type InferIt<T, V extends "RT" | "P" | "B"> = T extends (
  ...args: infer P
) => infer RT | Promise<infer RT> | PromiseLike<infer RT> | Awaited<infer RT>
  ? V extends "B"
    ? { readonly params: P; readonly returnType: RT }
    : V extends "RT"
      ? RT
      : V extends "P"
        ? P
        : T
  : T;


/**
 * usage with dynamic page routes in nextjs app directory
 *
 * ```tsx
  export default async function DynamicPage({
    params
  }: InferGSPRT<typeof generateStaticParams>) {
    // your code here
  }
  ```
*/

export type InferGSPRT<V extends (...args: any) => any> = {
  params: Promise<Unenumerate<InferIt<V, "RT">>>;
};

export type ExpectedRes = {
  qr: string;
  userAgentObject: globalThis.UserAgent;
  ua: string;
  ip: string;
  tz: string;
  city: string;
  lat: string;
  lng: string;
  flag: string;
};
