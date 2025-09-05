import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import RevealOnView from "@/components/reveal-on-view"
import { formatDistanceToNow } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <RevealOnView className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </RevealOnView>

        <article className="max-w-4xl mx-auto">
          <RevealOnView intensity="hero" className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-5xl font-black tracking-tight mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 text-white/60">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</time>
            </div>
          </RevealOnView>

          <RevealOnView className="prose prose-lg prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </RevealOnView>
        </article>
      </div>
    </main>
  )
}
