import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANT: Use your current Vercel URL here!
  const baseUrl = 'https://vesta-kenya-fawn.vercel.app' 

  // Fetch all verified listings
  const { data: listings } = await supabase
    .from('listings')
    .select('id, updated_at')
    .eq('is_verified', true) 

  // Create URLs for each listing
  const listingUrls = listings?.map((listing) => ({
    url: `${baseUrl}/browse/${listing.id}`,
    lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  // Add main static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  return [...staticPages, ...listingUrls]
}
