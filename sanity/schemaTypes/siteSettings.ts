import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

const WEEKDAYS = [
  { title: 'Mandag', value: 'man' },
  { title: 'Tirsdag', value: 'tir' },
  { title: 'Onsdag', value: 'ons' },
  { title: 'Torsdag', value: 'tor' },
  { title: 'Fredag', value: 'fre' },
  { title: 'Lørdag', value: 'lor' },
  { title: 'Søndag', value: 'son' },
]

const daysField = defineField({
  name: 'days',
  title: 'Dager',
  type: 'array',
  of: [{ type: 'string' }],
  options: { list: WEEKDAYS, layout: 'grid' },
  validation: (rule) => rule.required().min(1),
})

const opensField = defineField({
  name: 'opens',
  title: 'Åpner',
  description: 'Format TT:MM, f.eks. 15:00',
  type: 'string',
  validation: (rule) => rule.required().regex(TIME_REGEX, { name: 'klokkeslett' }),
})

const closesField = defineField({
  name: 'closes',
  title: 'Stenger',
  description: 'Format TT:MM, f.eks. 22:00',
  type: 'string',
  validation: (rule) => rule.required().regex(TIME_REGEX, { name: 'klokkeslett' }),
})

function openingHoursGroupTitle(days: string[]) {
  return days.map((value) => WEEKDAYS.find((day) => day.value === value)?.title ?? value).join(', ')
}

const openingHoursGroup = defineArrayMember({
  type: 'object',
  name: 'openingHoursGroup',
  fields: [daysField, opensField, closesField],
  preview: {
    select: { days: 'days', opens: 'opens', closes: 'closes' },
    prepare: ({ days, opens, closes }: { days?: string[]; opens?: string; closes?: string }) => ({
      title: openingHoursGroupTitle(days ?? []),
      subtitle: opens && closes ? `${opens}–${closes}` : undefined,
    }),
  },
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nettsiden',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'innhold', title: 'Innhold', default: true },
    { name: 'kontakt', title: 'Kontakt & bestilling' },
    { name: 'seo', title: 'Søkeoptimalisering' },
  ],
  fields: [
    defineField({
      name: 'logo',
      group: 'innhold',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativ tekst',
        }),
      ],
    }),
    defineField({
      name: 'heroImage',
      group: 'innhold',
      title: 'Hovedbilde',
      description: 'Bakgrunnsbilde i toppen av siden, brukes også i «Om oss»',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativ tekst',
        }),
      ],
    }),
    defineField({
      name: 'heroHeading',
      group: 'innhold',
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroText',
      group: 'innhold',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'menuHeading',
      group: 'innhold',
      title: 'Meny – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'menuText',
      group: 'innhold',
      title: 'Meny – ingress',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'aboutHeading',
      group: 'innhold',
      title: 'Om oss – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      group: 'innhold',
      title: 'Om oss – tekst',
      description: 'Tomme linjer gir nye avsnitt',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'contactHeading',
      group: 'innhold',
      title: 'Kontakt – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      group: 'kontakt',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      group: 'kontakt',
      title: 'E-post',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'address',
      group: 'kontakt',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      group: 'kontakt',
      title: 'Åpningstider',
      description: 'Én rad per gruppe dager med samme åpningstid, f.eks. mandag–lørdag for seg og søndag for seg',
      type: 'array',
      of: [openingHoursGroup],
    }),
    defineField({
      name: 'orderingEnabled',
      group: 'kontakt',
      title: 'Ta imot bestillinger på nett',
      description: 'Skru av for å midlertidig deaktivere bestillingsknappene',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'orderingDisabledMessage',
      group: 'kontakt',
      title: 'Melding når bestilling er stengt',
      description: 'Vises når noen trykker på den utgråtte bestillingsknappen mens bestilling er stengt.',
      type: 'string',
      hidden: ({ parent }) => parent?.orderingEnabled !== false,
      initialValue: 'Vi tar dessverre ikke imot bestillinger på nett akkurat nå. Ring oss gjerne!',
    }),
    defineField({
      name: 'orderUrl',
      group: 'kontakt',
      title: 'Bestillingslenke',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'orderCtaLabel',
      group: 'kontakt',
      title: 'Bestillingsknapp – tekst',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      group: 'kontakt',
      title: 'Facebook',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'instagramUrl',
      group: 'kontakt',
      title: 'Instagram',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'seoTitle',
      group: 'seo',
      title: 'SEO – sidetittel',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      group: 'seo',
      title: 'SEO – beskrivelse',
      description: 'Åpningstider legges til automatisk på slutten — ikke skriv dem inn her',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Nettsiden' }),
  },
})
