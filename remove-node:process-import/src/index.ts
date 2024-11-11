import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
    .jsFam()
    .astGrep({
      id: "remove-node:process",
      language: "TypeScript",
      rule: {
        pattern: {
          context: "import process from 'node:process'",
          strictness: "relaxed",
        }
      },
      fix: ""
    })
}

