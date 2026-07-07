import { BarChartIcon } from '@sanity/icons'
import type { Tool } from 'sanity'

import { UMAMI_SHARE_URL } from '../lib/analytics'

function Statistikk() {
  return (
    <iframe
      src={UMAMI_SHARE_URL}
      title="Statistikk"
      style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
    />
  )
}

/** Umami's read-only share dashboard, embedded so the owner has one login. */
export const statistikkTool: Tool = {
  name: 'statistikk',
  title: 'Statistikk',
  icon: BarChartIcon,
  component: Statistikk,
}
