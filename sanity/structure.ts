import { CogIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const SINGLETONS = new Set(['siteSettings'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Innstillinger')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Innstillinger'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.has(listItem.getId() as string),
      ),
    ])
