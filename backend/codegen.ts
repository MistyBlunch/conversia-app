import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: './src/server/graphql/*.graphql',
  generates: {
    "./src/server/graphql/generated/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
