import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
    .jsFam()
    .astGrep({rule: {
  kind: "identifier",
  regex: "^window$",
  inside: {
    kind: "member_expression"
  }
}})
    .replace("globalThis");
}

