import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'

// 1. Update the type: params is now a Promise in Next.js 16
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. Await the params to unlock the actual slug string
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // 3. Fetch the post using the resolved slug
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title, "imageUrl": mainImage.asset->url, body
  }`, { slug: slug })

  if (!post) {
    return (
      <div className="flex-grow flex items-center justify-center mt-20">
        <h1 className="font-tanpearl text-3xl text-awy-espresso">Article not found.</h1>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto mt-10 mb-20 flex-grow">
      {/* Cover Image & Title Wrapper */}
      <div className="relative h-[400px] mb-16 rounded-3xl overflow-hidden shadow-xl">
        {post.imageUrl ? (
           <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
           <div className="w-full h-full bg-awy-mocha" />
        )}
        
        {/* The brown title box overlapping the bottom of the image */}
        <div className="absolute bottom-0 w-full bg-awy-mocha/90 py-6 text-center backdrop-blur-sm border-t border-awy-light/20">
          <h1 className="font-tanpearl text-4xl md:text-5xl text-awy-light px-4">{post.title}</h1>
        </div>
      </div>

      {/* The Article Body */}
      <div className="prose prose-lg md:prose-2xl text-awy-espresso prose-p:leading-relaxed mx-auto font-seasons prose-headings:font-tanpearl prose-headings:text-awy-mocha prose-a:text-awy-caramel">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}