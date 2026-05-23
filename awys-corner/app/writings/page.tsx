// app/writings/page.tsx
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

export const revalidate = 0;

export default async function Writings() {
  // Fetch all posts
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, "imageUrl": mainImage.asset->url
  }`)

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-20">
      <h1 className="font-tanpearl text-5xl mb-12 text-center text-awy-espresso">All My Writings</h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-xl font-seasons">No articles published yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link href={`/writings/${post.slug.current}`} key={post._id} className="block group">
              <div className="bg-awy-mocha rounded-2xl overflow-hidden transition-transform group-hover:scale-105">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                ) : (
                  <div className="w-full h-64 bg-awy-espresso flex items-center justify-center">
                    <span className="text-awy-light font-seasons">No image</span>
                  </div>
                )}
                <div className="p-4 text-center">
                  <h2 className="text-awy-light font-tanpearl text-xl">{post.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}