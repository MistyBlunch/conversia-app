import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/lib/graphql/**/*.graphql',
  generates: {
    'src/lib/graphql/generated/operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}

export default config
