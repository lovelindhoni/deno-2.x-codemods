import fs from "fs";
import type { Api } from "@codemod.com/workflow";

// Interfaces to be replaced in the code
const denoInterfaces = [
  "Reader",
  "ReaderSync",
  "Seeker",
  "SeekerSync",
  "Writer",
  "WriterSync",
  "Closer",
];

// Tracks imports by file with interfaces to import
const fileImports: Record<string, Set<string>> = {};

export async function workflow({ files, contexts }: Api) {
  for (const denoInterface of denoInterfaces) {
    await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
      .jsFam()
      .astGrep(buildQuery(denoInterface))
      .replace(() => handleReplacement(denoInterface, contexts));
  }

  for (const [filePath, interfaces] of Object.entries(fileImports)) {
    addImportsToFile(filePath, Array.from(interfaces));
  }
}

// Constructs the AST query for locating specific Deno interfaces
const buildQuery = (denoInterface: string) => (
`
rule: 
    kind: nested_type_identifier
    regex: ^Deno.${denoInterface}$
`
);

// Handles replacements by adding interface to imports if not already present
const handleReplacement = (interfaceName: string, contexts: Api["contexts"]) => {
  const fileKey = contexts.getFileContext().file;

  if (!fileImports[fileKey]) {
    fileImports[fileKey] = new Set();
  }

  fileImports[fileKey].add(interfaceName);
  return interfaceName; // Return the interface name to replace `Deno.Interface` with `Interface`
};

// Adds imports to the top of the specified file
const addImportsToFile = (filePath: string, interfaces: string[]) => {
  const importLine = `import { ${interfaces.join(", ")} } from "jsr:@std/io/types";\n`;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const updatedContent = `${importLine}${fileContent}`;
  fs.writeFileSync(filePath, updatedContent, "utf-8");
};

