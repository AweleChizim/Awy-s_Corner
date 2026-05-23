// app/page.tsx
import { client } from '@/sanity/lib/client'
import Link from 'next/link'

export const revalidate = 0;

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, "imageUrl": mainImage.asset->url
  }`)

  return (
    <div className="w-full flex flex-col flex-grow">
      
      {/* My Writings Grid */}
      <div className="max-w-6xl w-full mx-auto mb-10">
        <h1 className="font-tanpearl text-2xl mb-6">My Writings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link href={`/writings/${post.slug.current}`} key={post._id} className="block group">
              <div className="bg-awy-mocha rounded-2xl overflow-hidden transition-transform group-hover:scale-105">
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
                <div className="p-4 text-center">
                  <h2 className="text-awy-light font-tanpearl text-xl">{post.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        
        <div className="text-center mb-6">
          <Link href="/writings" className="font-tanpearl text-xl underline hover:text-awy-mocha transition-colors">
            see more...
          </Link>
        </div>

        {/* Author's Note */}
        <div className="bg-awy-sand -mx-8 px-8 py-4 text-center text-awy-espresso">
          <h2 className="font-tanpearl text-xl md:text-xl mb-1">Words we cannot speak...</h2>
          <p className="max-w-3xl mx-auto text-xl md:text-xl leading-snug mb-1 font-seasons">
            Thank you so much for stopping by and reading my work. I hope it inspired you, moved you or simply made you feel something. Until next time ✨
          </p>
          <div className="font-seasons text-xl md:text-xl leading-tight">
            <p>Your Softly,</p>
            <p>Awele</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}