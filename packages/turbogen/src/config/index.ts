import { execSync } from "child_process";
import fsSync, { promises as fsAsync } from "fs";
import { relative } from "path";
import * as dotenv from "dotenv";
import type {
  ExecuteCommandProps,
  MkDirSyncProps,
  ReadDirOptions,
  ReadDirProps,
  RemoveFields,
  Unenumerate,
  WriteFileAsyncDataUnion,
  WriteFileAsyncProps,
  WriteStreamProps
} from "@/types/index.js";

dotenv.config();

/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

export class ConfigHandler {
  constructor(public cwd: string) {}

  private extractTuple<
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T
  >(obj: T, props: V) {
    return [props, obj[props]] as const satisfies readonly [V, T[V]];
  }

  public readNpmrcConditional() {
    const path = `.npmrc` as const;
    if (this.exists(path)) {
      const fileContents = Buffer.from(
        this.fileToBuffer({ cwd: (this.cwd ??= process.cwd()), path }).toJSON()
          .data
      ).toString("utf-8");
      return [true, fileContents] as const;
    } else return [false, null] as const;
  }

  public get npmrcDefault() {
    // prettier-ignore
    return `enable-pre-post-scripts=true
node-linker=hoisted
link-workspace-packages=true
email=


# Uncomment the following lines and provide corresponding values to point at the npm registry

# //registry.npmjs.org/:_authToken=
# //registry.npmjs.org/:_password=
# //registry.npmjs.org/:username=`;
  }

  public handleNpmrc() {
    const arrHelper = Array.of<string>();
    const [doesExist, conditionalContents] = this.readNpmrcConditional();
    if (doesExist === true && typeof conditionalContents === "string") {
      arrHelper.push(conditionalContents);
      const file = conditionalContents;
      try {
        if (/enable-pre-post-scripts=true/g.test(file) === false) {
          arrHelper.push(`enable-pre-post-scripts=true`);
        }
        if (/node-linker=hoisted/g.test(file) === false) {
          arrHelper.push(`node-linker=hoisted`);
        }
        if (/link-workspace-packages=true/g.test(file) === false) {
          arrHelper.push("link-workspace-packages=true");
        }
      } catch (error) {
        console.error(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        );
      } finally {
        this.withWs({
          data:
            arrHelper.length >= 1 ? arrHelper.join(`\n`) : conditionalContents,
          path: ".npmrc",
          cwd: (this.cwd ??= process.cwd())
        });
      }
    } else {
      this.withWs({
        data: this.npmrcDefault,
        path: ".npmrc",
        cwd: (this.cwd ??= process.cwd())
      });
    }
  }

  public sort<
    const S extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const K extends "ASC" | "DESC" | undefined
  >(obj: S, order?: K) {
    return Object.fromEntries(
      Object.entries(obj).sort(([a, _aa], [b, _bb]) =>
        order === "DESC"
          ? b.localeCompare(a) - a.localeCompare(b)
          : a.localeCompare(b) - b.localeCompare(a)
      )
    ) as S;
  }

  public excludeTargeted = <
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T,
    const S extends Parameters<typeof this.sort>["1"]
  >(
    obj: T,
    props: V[],
    sort?: S
  ) => {
    const resolve = Object.fromEntries(
      Object.entries(obj)
        .map(([key, val]) => {
          if (props.includes(key as V)) {
            return ["omit", "omit"] as const;
          } else return [key, val] as const;
        })
        .filter(([t, _v]) => /omit/.test(t) === false)
    );
    return (
      typeof sort !== "undefined" ? this.sort(resolve, sort) : resolve
    ) as RemoveFields<T, Unenumerate<typeof props>>;
  };

  public includeTargeted = <
    const T extends
      | Record<string | number | symbol, unknown>
      | Enumerator<unknown>,
    const V extends keyof T,
    const S extends Parameters<typeof this.sort>["1"]
  >(
    obj: T,
    props: V[],
    sort?: S
  ) => {
    const resolve = Object.fromEntries(
      props.map(val => this.extractTuple(obj, val))
    );
    return (
      typeof sort !== "undefined" ? this.sort(resolve, sort) : resolve
    ) as Pick<T, Unenumerate<typeof props>>;
  };

  public omitFields<
    const Target extends { [record: string | symbol | number]: unknown },
    const Key extends keyof Target
  >(target: Target, keys: Key[]): RemoveFields<Target, Unenumerate<Key>> {
    let obj = target;
    keys.forEach(t => {
      if (t in obj) {
        delete obj[t];
        return obj;
      } else {
        return obj;
      }
    });
    return obj;
  }

  public omitTargetedFields<
    const T extends { [record: string | symbol | number]: unknown },
    const K extends keyof T
  >(targ: T, keys: K[]) {
    return { ...this.omitFields(targ, keys) };
  }

  public exists<const T extends string>(target: T) {
    return fsSync.existsSync(relative(this.cwd ?? process.cwd(), target));
  }

  public arrToArrOfArrs = <const T, const N extends number>({
    arrToFragment = Array.of<T>(),
    arrOfArrsAggregator = Array.of<T[]>(),
    interval
  }: {
    arrToFragment: T[];
    arrOfArrsAggregator: T[][];
    interval: N;
  }) =>
    new Promise((resolve, _reject) =>
      resolve(
        ((interval: number) => {
          for (let i = 0; i <= arrToFragment.length; i++) {
            if ((i % interval === 0 || i === 0) && i <= arrToFragment.length) {
              let segment = arrToFragment.slice(i, i + interval);
              arrOfArrsAggregator.push(segment);
            }
          }
        })(interval)
      )
    ).then(_ => arrOfArrsAggregator);

  public wait<T extends number>(ms: T) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public countsSorter = <
    T extends Record<string, number> | Readonly<Record<string, number>>,
    K extends "ASC" | "DESC" | undefined,
    V extends "ASC" | "DESC" | undefined
  >({
    counter,
    keySort,
    valSort
  }: {
    counter: T;
    keySort?: K;
    valSort?: V;
  }) =>
    Object.fromEntries(
      Object.entries(counter)
        .sort(([aStr, _aNum], [bStr, _bNum]) =>
          keySort === "DESC"
            ? bStr.localeCompare(aStr) - aStr.localeCompare(bStr)
            : aStr.localeCompare(bStr) - bStr.localeCompare(aStr)
        )
        .sort(([_aStr, aNum], [_bStr, bNum]) =>
          valSort === "ASC" ? aNum - bNum : bNum - aNum
        )
    ) satisfies Record<string, number> | Readonly<Record<string, number>>;

  public hasNpmrcConfig() {
    return fsSync.existsSync(relative(this.cwd, ".gitignore"));
  }

  public handleBuffStrArrUnion<
    const T extends (string | Buffer)[] | readonly (string | Buffer)[]
  >(arr: T) {
    return arr.map(v =>
      Buffer.isBuffer(v) ? Buffer.from(v).toString("utf-8") : v
    );
  }

  public readDir<const T extends string>({
    cwd,
    path,
    options
  }: ReadDirProps<T>) {
    return this.handleBuffStrArrUnion(
      fsSync.readdirSync(relative(cwd, path), options) satisfies (
        | string
        | Buffer
      )[]
    );
  }

  public executeCommand = <T extends string>({
    command,
    ...options
  }: ExecuteCommandProps<T>) =>
    Buffer.from(
      Buffer.from(execSync(command, { ...options }).toJSON().data)
    ).toString("utf-8");

  public fileGenTimestamp<
    T extends InstanceType<typeof Date> = InstanceType<typeof Date>
  >(d: T) {
    const date = d.toISOString();
    // prettier-ignore
    return `/* file-autogenerated by @d0paminedriven/turbogen on ${date.split(/([T])/gm)?.[0]} at ${date.split(/([T])/gm)[2]?.split(/([Z])/gm)?.[0]} UTC */` as const;
  }

  public configFileGenTimestamp<T extends InstanceType<typeof Date>>(d: T) {
    return this.fileGenTimestamp(d).replace("/*", "#").replace("*/", "");
  }

  public mdFileGenTimestamp<T extends InstanceType<typeof Date>>(d: T) {
    return this.fileGenTimestamp(d).replace("/*", "<!--").replace("*/", "-->");
  }

  public existsSync<const T extends string>({
    cwd,
    path
  }: {
    cwd: string;
    path: T;
  }) {
    return fsSync.existsSync(relative(this.cwd ?? cwd, path));
  }

  public isPlainObject(obj: unknown): obj is Record<string, unknown> {
    const stringifiedObj = "[object Object]" as const;
    return (
      !!obj &&
      typeof obj === "object" &&
      Object.prototype.toString.call<object, [], string>(obj) === stringifiedObj
    );
  }

  public parseFileFromPath(path: string) {
    return /\//g.test(path) === true
      ? path?.split(/([/])/gim)?.reverse()?.[0]
      : path;
  }

  public pathHandler<T extends string>(path: T) {
    return /\//g.test(path) === true
      ? path
          .split(/([\/])/gim)
          .reverse()
          .slice(2)
          .reverse()
          .join("")
      : path;
  }

  public mkdirSync<T extends string>({
    cwd,
    path,
    options
  }: MkDirSyncProps<T>) {
    return fsSync.mkdirSync(relative(cwd, path), options);
  }

  public fileSizeMb<T extends string>(path: T) {
    return (
      fsSync.statSync(relative(this.cwd ?? process.cwd(), path)).size /
      (1024 * 1024)
    );
  }

  public generateDirIfDNE<T extends string>({
    path,
    cwd,
    options
  }: MkDirSyncProps<T>) {
    const doesExist = this.existsSync({ path, cwd });
    if (doesExist === true) return;
    else {
      return this.mkdirSync({ cwd, path, options });
    }
  }

  public withWs<T extends string>({ data, cwd, path }: WriteStreamProps<T>) {
    try {
      if (/\//g.test(path) === true) {
        return this.generateDirIfDNE({
          path: this.pathHandler(path),
          cwd: cwd ?? this.cwd ?? process.cwd(),
          options: { recursive: true }
        });
      } else return path;
    } catch (error) {
      console.error(
        `[withWs error]: `.concat(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        )
      );
    } finally {
      return fsSync
        .createWriteStream(relative(cwd, path), { autoClose: true })
        .write(Buffer.from(Buffer.from(data).toJSON().data));
    }
  }

  public writeFileAsync = async <const T extends string>({
    data,
    cwd,
    path,
    options
  }: WriteFileAsyncProps<T>) => {
    try {
      if (/\//g.test(path) === true)
        return this.generateDirIfDNE({
          path: this.pathHandler(path),
          cwd: cwd ?? this.cwd,
          options: { recursive: true }
        });
      else return path;
    } catch (error) {
      console.error(
        `[writeFileAsync error]: `.concat(
          typeof error === "string" ? error : JSON.stringify(error, null, 2)
        )
      );
    } finally {
      return (await fsAsync.writeFile(
        relative(cwd, path),
        Buffer.from(
          Buffer.from(data satisfies WriteFileAsyncDataUnion).toJSON()
            .data satisfies number[]
        ) satisfies Uint8Array,
        options
      )) satisfies void;
    }
  };

  public fileToBuffer = <T extends string>({
    cwd,
    path
  }: {
    cwd: string;
    path: T;
  }) =>
    Buffer.from(
      Buffer.from(
        fsSync.readFileSync(relative(cwd, path)).toJSON()
          .data satisfies number[]
      ) satisfies WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
    ) satisfies Buffer;

  public dirContainsDir({
    readDir,
    targetDir,
    options
  }: {
    readDir: string;
    targetDir: string;
    options?: ReadDirOptions;
  }) {
    return this.readDir({
      cwd: this.cwd ?? process.cwd(),
      path: readDir,
      options
    })
      .filter(t => t.split(".").length === 1)
      .includes(targetDir);
  }
}
