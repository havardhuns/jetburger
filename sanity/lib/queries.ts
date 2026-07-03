import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  logo {
    asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
    alt,
    hotspot,
    crop
  },
  heroImage {
    asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
    alt,
    hotspot,
    crop
  },
  heroHeading,
  heroText,
  aboutHeading,
  aboutText,
  phone,
  email,
  address,
  openingHours,
  orderUrl,
  facebookUrl,
  instagramUrl
}`)

export const MENU_CARDS_QUERY = defineQuery(`*[_type == "menuCard"] | order(sortOrder asc){
  _id,
  title,
  image {
    asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
    alt,
    hotspot,
    crop
  }
}`)
