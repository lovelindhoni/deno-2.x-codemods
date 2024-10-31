import type { Api } from "@codemod.com/workflow";

// Mapping Deno resource ID (rid) methods to their new equivalent methods
const resourceMethodMappings: Record<string, string> = {
  flock: "lock",
  flockSync: "lockSync",
  fsync: "sync",
  fsyncSync: "syncSync",
  ftruncate: "truncate",
  ftruncateSync: "truncateSync",
  funlock: "unlock",
  funlockSync: "unlockSync",
  fdatasync: "syncData",
  fdatasyncSync: "syncDataSync",
  futime: "utime",
  futimeSync: "utimeSync",
  fstateSync: "statSync",
  fstat: "stat",
  seek: "seek",
  seekSync: "seekSync",
  read: "read",
  readSync: "readSync",
  write: "write",
  writeSync: "writeSync",
  close: "close",
  shutdown: "closeWrite",
  isatty: "isTerminal",
};

export async function workflow({ files }: Api) {
  for (const [oldMethod, newMethod] of Object.entries(resourceMethodMappings)) {
    await files("**/*.{js,ts,tsx,jsx,cjs,mjs,es6,es}")
      .jsFam()
      .astGrep(buildQuery(oldMethod))
      .replace(({ getMatch, getMultipleMatches }) => {
        const resourceObj = getMatch("A")?.text();
        const restParams = getMultipleMatches("B").map((param) => param.text());
        return transformResourceCall(resourceObj, restParams, newMethod);
      });
  }
}

// Builds an AST query to locate Deno method calls matching the old method name
const buildQuery = (oldMethod: string) => ({
  rule: {
    kind: "call_expression",
    pattern: `Deno.${oldMethod}($A $$$B)`,
  },
});

// Transforms the call expression by renaming the method and adjusting parameters
const transformResourceCall = (
  resourceArg: string | undefined,
  additionalArgs: string[],
  newMethod: string,
): string | undefined => {
  if (additionalArgs.length > 0) additionalArgs.shift(); // Remove the first comma if present

  if (resourceArg && resourceArg.endsWith(".rid")) {
    const resourceObject = resourceArg.slice(
      0,
      resourceArg.lastIndexOf(".rid"),
    );
    return `${resourceObject}.${newMethod}(${additionalArgs.join(", ")})`;
  }
};
