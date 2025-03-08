import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:7100/api",
  documents: "src/**/*.{tsx,ts,graphql}",
  ignoreNoDocuments: true,
  generates: {
    "src/graphql/hooks.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        addDocBlocks: true,
      },
    },
  },
};

export default config;
