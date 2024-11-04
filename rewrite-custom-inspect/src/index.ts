import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
    .jsFam()
    .astGrep({
      rule: {
        kind: "member_expression",
        pattern: "Deno.customInspect",
      },
    })
    .replace(`Symbol.for("Deno.customInspect")`);
}

