import fs from "fs";
import type { Api } from "@codemod.com/workflow";

// Maps Deno method names to their replacements
const methodMappings = {
  Buffer: "Buffer",
  copy: "copy",
  iter: "iterateReader",
  iterSync: "iterateReaderSync",
  writeAllSync: "writeAllSync",
  writeAll: "writeAll",
  readAllSync: "readAllSync",
  readAll: "readAll",
};

// Maps each replacement method to its module
const methodToModule: Record<string, string> = {
  Buffer: "buffer",
  copy: "copy",
  iterateReader: "iterate-reader",
  iterateReaderSync: "iterate-reader",
  writeAllSync: "write-all",
  writeAll: "write-all",
  readAllSync: "read-all",
  readAll: "read-all",
};

// Tracks the imports needed for each file
const fileImports: Record<string, Set<string>> = {};

export async function workflow({ files, contexts }: Api) {
  // Process all mappings from Deno methods to their replacements
  for (const [denoMethod, replacementMethod] of Object.entries(
    methodMappings,
  )) {
    await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
      .jsFam()
      .astGrep(buildQuery(denoMethod))
      .replace(({ getNode }) => {
        const currentFilePath = contexts.getFileContext().file;

        // Initialize the file's import set if it doesn't exist
        if (!fileImports[currentFilePath]) {
          fileImports[currentFilePath] = new Set();
        }

        // Add the replacement method to the file's imports
        fileImports[currentFilePath].add(replacementMethod);

        return replacementMethod;
      });
  }

  // Add the required imports to each file
  for (const [filePath, requiredMethods] of Object.entries(fileImports)) {
    const importStatements = generateImportStatements(requiredMethods);
    prependImportsToFile(filePath, importStatements);
  }
}

// Constructs the AST query for locating specific Deno methods
const buildQuery = (denoMethod: string) => ({
  rule: {
    kind: "member_expression",
    regex: `^Deno.${denoMethod}$`,
  },
});

// Generates import statements grouped by their module
function generateImportStatements(methods: Set<string>): string {
  const moduleGroupedImports: Record<string, string[]> = {};

  // Group methods by their module
  for (const func of methods) {
    const module = methodToModule[func] as string;
    if (!moduleGroupedImports[module]) {
      moduleGroupedImports[module] = [];
    }
    moduleGroupedImports[module].push(func);
  }

  // Create import lines for each module
  return Object.entries(moduleGroupedImports)
    .map(
      ([module, funcs]) =>
        `import { ${funcs.join(", ")} } from "jsr:@std/io/${module}";`,
    )
    .join("\n");
}

// Prepends import statements to a file
function prependImportsToFile(filePath: string, importStatements: string) {
  const originalContent = fs.readFileSync(filePath, "utf-8");
  const newContent = `${importStatements}\n\n${originalContent}`;
  fs.writeFileSync(filePath, newContent, "utf-8");
}
