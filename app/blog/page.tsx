import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { formatDistanceToNow } from "date-fns"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <RevealOnView intensity="hero" className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Thoughts on design, development, and building great products.
          </p>
        </RevealOnView>

        {posts.length === 0 ? (
          <RevealOnView className="text-center py-16">
            <p className="text-white/60 text-lg">No blog posts yet. Check back soon!</p>
          </RevealOnView>
        ) : (
          <div className="grid gap-8 md:gap-12">
            {posts.map((post, index) => (
              <RevealOnView key={post.slug} delay={index * 0.1} className="group">
                <article className="border border-white/10 rounded-2xl p-8 bg-neutral-900/50 hover:bg-neutral-900/70 transition-colors">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-white/90 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
                  </Link>

                  <div className="flex items-center justify-between text-sm text-white/50">
                    <div className="flex items-center gap-4">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <time dateTime={post.date}>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</time>
                  </div>
                </article>
              </RevealOnView>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
