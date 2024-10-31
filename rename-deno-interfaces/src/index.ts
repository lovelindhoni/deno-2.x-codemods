import type { Api } from "@codemod.com/workflow";

const renamedInterfaces = {
  "Deno.CAARecord": "Deno.CaaRecord",
  "Deno.MXRecord": "Deno.MxRecord",
  "Deno.NAPTRRecord": "Deno.NaptrRecord",
  "Deno.SOARecord": "Deno.SoaRecord",
  "Deno.SRVRecord": "Deno.SrvRecord",
  "Deno.File": "Deno.FsFile",
  "Deno.Sever": "Deno.HttpServer",
};

export async function workflow({ files }: Api) {
  for (const [oldInterface, newInterface] of Object.entries(renamedInterfaces)) {
    await updateFiles(oldInterface, newInterface, files);
  }
}

async function updateFiles(oldInterface: string, newInterface: string, files: Api['files']) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs,es6,es}")
    .jsFam()
    .astGrep({
      rule: {
        kind: "nested_type_identifier",
        regex: oldInterface,
      },
    })
    .replace(newInterface);
}

