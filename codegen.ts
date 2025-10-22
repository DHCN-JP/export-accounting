
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: ["src/gql/**/*.graphql", "src/gql/**/*.ts"],
  generates: {
    "./types/graphql-types.ts": {
      plugins: ["typescript"]
    },
    "./types/graphql-operations.ts": {
      plugins: ["typescript", "typescript-operations"]
    },
    "./src/gql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-vue-urql"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
