import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Innstillinger',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'logo',
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
      title: 'Overskrift',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroText',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'menuHeading',
      title: 'Meny – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'menuText',
      title: 'Meny – ingress',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'aboutHeading',
      title: 'Om oss – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'Om oss – tekst',
      description: 'Tomme linjer gir nye avsnitt',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'contactHeading',
      title: 'Kontakt – overskrift',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Åpningstider',
      type: 'string',
    }),
    defineField({
      name: 'orderUrl',
      title: 'Bestillingslenke',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'orderCtaLabel',
      title: 'Bestillingsknapp – tekst',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO – sidetittel',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO – beskrivelse',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Innstillinger' }),
  },
})
