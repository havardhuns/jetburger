'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import {nbNOLocale} from '@sanity/locale-nb-no'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {statistikkTool} from './sanity/statistikkTool'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  releases: {enabled: false},
  plugins: [
    nbNOLocale(),
    structureTool({structure, title: 'Innhold'}),
    // Vision (GROQ playground) is a developer tool — dev only, so the
    // deployed Studio shows editors nothing but Innhold and Statistikk.
    // https://www.sanity.io/docs/the-vision-plugin
    ...(process.env.NODE_ENV === 'development' ? [visionTool({defaultApiVersion: apiVersion})] : []),
  ],
  tools: [statistikkTool],
})
