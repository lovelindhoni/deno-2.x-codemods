import type { Api } from "@codemod.com/workflow";

// TLS methods and property names to check in the AST
const tlsMethods = ["Deno.connectTls", "Deno.listenTls"];
const tlsProperties = ["certFile", "certChain", "keyFile"];

// Parses a string value to extract content after the first colon (":")
const parseKeyValue = (value: string): string => {
  const separatorIndex = value.indexOf(":");
  return separatorIndex !== -1 ? value.slice(separatorIndex + 1).trim() : value;
};

// Builds the AST query structure for the given property, replacement, and TLS method
const buildQuery = (originalProp: string, newProp: string, tlsMethod: string) => ({
  rule: {
    kind: "pair",
    has: {
      kind: "property_identifier",
      regex: `^${originalProp}$`,
    },
    inside: {
      kind: "object",
      not: {
        has: {
          kind: "pair",
          has: {
            kind: "property_identifier",
            regex: `^${newProp}$`,
          },
        },
      },
      inside: {
        kind: "arguments",
        inside: {
          kind: "call_expression",
          has: {
            kind: "member_expression",
            regex: `^${tlsMethod}$`,
          },
        },
      },
    },
  },
});

export async function workflow({ files }: Api) {
  for (const tlsMethod of tlsMethods) {
    for (const originalProp of tlsProperties) {
      const newProp = originalProp === "keyFile" ? "key" : "cert";

      await files("**/*.{js,ts,tsx,jsx,cjs,mjs,es6,es}")
        .jsFam()
        .astGrep(buildQuery(originalProp, newProp, tlsMethod))
        .replace(({ getNode }) => {
          const value = parseKeyValue(getNode().text());
          const formattedValue = formatKeyValuePair(newProp, value);
          return formattedValue;
        });
    }
  }
}

// Formats the key-value pair based on whether the value is a file path or a literal
const formatKeyValuePair = (newProp: string, value: string): string => {
  const isLiteral = ['"', "'", "`"].includes(value[0] as string);
  return isLiteral
    ? `${newProp}: Deno.readTextFileSync(${value})`
    : `${newProp}: ${value}`;
};

