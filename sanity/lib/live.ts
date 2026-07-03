// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

// Viewer-scope token from sanity.io/manage → API → Tokens. With it, publishes
// push instant cache invalidations; without it, freshness falls back to the
// Sanity CDN's propagation delay (~up to a minute).
const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  ...(token ? { serverToken: token, browserToken: token } : {}),
});
