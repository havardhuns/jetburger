/**
 * Seeds the dataset with the site settings and the three menu cards,
 * uploading the photos from public/. Safe to re-run: images are
 * deduplicated by Sanity, missing siteSettings fields are filled in
 * without touching edited ones, and menu cards are only created when
 * missing.
 *
 * Run with: pnpm sanity exec scripts/seed.ts --with-user-token
 */
import { createReadStream } from 'node:fs'
import path from 'node:path'

import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-07-03' })

async function uploadImage(filename: string) {
  const filePath = path.join(process.cwd(), 'public', filename)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })
  console.log(`Uploaded ${filename} -> ${asset._id}`)
  return asset._id
}

function imageValue(assetId: string, alt: string) {
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: assetId },
    alt,
  }
}

async function seed() {
  const [logoId, storefrontId, burgereId, pizzaId, sidesId] = await Promise.all([
    uploadImage('logo.svg'),
    uploadImage('storefront.jpg'),
    uploadImage('meny-burgere.jpg'),
    uploadImage('meny-pizza.jpg'),
    uploadImage('meny-sides.jpg'),
  ])

  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' })
  await client
    .patch('siteSettings')
    .setIfMissing({
      logo: imageValue(logoId, 'Jetburger-logoen'),
      heroImage: imageValue(storefrontId, 'Jetburger i Evje sentrum'),
      heroHeading: 'Evje-trioen med bygdas (kanskje) beste burger',
      heroText:
        'Hjemmelagde burgere, hjemmelaget pizza og sprø fries — laget fra bunnen, midt i Evje sentrum.',
      menuHeading: 'Det vi lager',
      menuText: 'Trykk på et menykort for å se det i full størrelse.',
      aboutHeading: 'Laget fra bunnen, midt i bygda',
      aboutText:
        'Jetburger drives av en trio fra Evje med ett mål: skikkelig god gatekjøkkenmat laget fra bunnen. Burgere med hjemmelaget dressing, hjemmelaget pizza og sprø fries — servert raskt, uten snarveier.\n\nDu finner oss midt i sentrum. Spis her, eller ta med hjem.',
      contactHeading: 'Finn oss',
      phone: '901 79 399',
      email: 'evjeftas@gmail.com',
      address: 'Nils Heglands veg 100, 4735 Evje',
      openingHours: 'Alle dager 15:00–22:00',
      orderUrl: 'https://bestilling.example.no/jetburger',
      orderCtaLabel: 'Bestill på nett',
      facebookUrl: 'https://www.facebook.com/p/Jetburger-100057352394070/',
      instagramUrl: 'https://www.instagram.com/jetburger.no/',
      seoTitle: 'Jetburger – Evje',
      seoDescription:
        'Hjemmelagde burgere, hjemmelaget pizza og sprø fries — laget fra bunnen, midt i Evje sentrum. Åpent alle dager 15:00–22:00.',
    })
    .commit()
  console.log('Wrote siteSettings (missing fields only)')

  const menuCards = [
    { title: 'Burgere', assetId: burgereId, alt: 'Meny: burgere og tilbehør til burger', sortOrder: 1 },
    { title: 'Pizza & barnemeny', assetId: pizzaId, alt: 'Meny: pizza, barnemeny og drikke', sortOrder: 2 },
    { title: 'Sides & snacks', assetId: sidesId, alt: 'Meny: sides, tilbehør og snacks', sortOrder: 3 },
  ]

  const existingTitles: string[] = await client.fetch('*[_type == "menuCard"].title')
  for (const card of menuCards) {
    if (existingTitles.includes(card.title)) {
      console.log(`Menu card "${card.title}" already exists, skipping`)
      continue
    }
    const doc = await client.create({
      _type: 'menuCard',
      title: card.title,
      image: imageValue(card.assetId, card.alt),
      sortOrder: card.sortOrder,
    })
    console.log(`Created menu card "${card.title}" (${doc._id})`)
  }

  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
