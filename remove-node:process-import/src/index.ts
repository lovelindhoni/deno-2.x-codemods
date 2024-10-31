import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs,es6,es}")
    .jsFam()
    .astGrep({
      rule: {
        pattern: {
          context: "import process from 'node:process'",
          strictness: "relaxed",
        },
      },
    })
    .replace(" ");
}

