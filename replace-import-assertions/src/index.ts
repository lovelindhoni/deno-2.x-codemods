import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
    .jsFam()
    .astGrep({
      rule: {
        any: [
          {
            pattern: `import $MODULE from "$PATH" assert { type: "$TYPE" };`,
          },
          {
            pattern: `import $MODULE from "$PATH" assert { type: "$TYPE" }`,
          },
        ],
      },
    })
    .replace(({ getMatch }) => {
      const MODULE = getMatch("MODULE")?.text();
      const PATH = getMatch("PATH")?.text();
      const TYPE = getMatch("TYPE")?.text();
      if (MODULE && PATH && TYPE)
        return `import ${MODULE} from "${PATH}" with { type : "${TYPE}" };`;
    });
}

