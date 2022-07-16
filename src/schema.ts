import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './graphql'

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), 'schema.graphql'), // This is the GraphQL Schema Definition Language (SDL) for defining the structure of your API
    typegen: join(process.cwd(), 'nexus-typegen.ts'), // which will contain TypeScript type definitions for all types in your GraphQL schema.
  },
})
