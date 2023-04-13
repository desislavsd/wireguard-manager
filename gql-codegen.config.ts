import { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'
dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GQL_HOST,
  documents: './**/*.{graphql,gql}',
  generates: {
    './gql/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
        'named-operations-object',
      ],
      config: {
        useTypeImports: true,
        vueCompositionApiImportFrom: 'vue',
      },
    },
  },
  config: {
    scalars: {
      DateTime: 'Date',
    },
  },
}

export default config
