import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs,es6,es}")
    .jsFam()
    .astGrep({
      rule: {
        kind: "member_expression",
        regex: "^Deno.customInspect$",
      },
    })
    .replace(`Symbol.for("Deno.customInspect")`);
}

