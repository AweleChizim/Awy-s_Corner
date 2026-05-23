import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Awy\'s Corner')
    .items([
      // This explicitly tells the sidebar to ONLY look for your 'post' schema
      S.documentTypeListItem('post').title('Writings'),
    ])