import { type SchemaTypeDefinition } from 'sanity'
import post from './schemaTypes/post' // This points to the blueprint you made earlier

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post],
}