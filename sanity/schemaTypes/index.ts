import { type SchemaTypeDefinition } from 'sanity'

import { menuCard } from './menuCard'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, menuCard],
}
