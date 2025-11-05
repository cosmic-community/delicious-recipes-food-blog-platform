// app/recipes/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const ingredients = post.metadata?.ingredients?.split('\n').filter(Boolean) || []

  return (
    <article className="py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          {category && (
            <Link 
              href={`/categories/${category.slug}`}
              className="inline-block text-primary-600 hover:text-primary-700 font-semibold mb-4"
            >
              ← {category.title}
            </Link>
          )}
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          {post.metadata?.description && (
            <p className="text-xl text-gray-600 mb-6">
              {post.metadata.description}
            </p>
          )}
          
          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-gray-600">
            {post.metadata?.cooking_time && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span>{post.metadata.cooking_time} minutes</span>
              </div>
            )}
            {post.metadata?.servings && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍽️</span>
                <span>{post.metadata.servings} servings</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-auto"
              width={800}
              height={450}
            />
          </div>
        )}

        {/* Author */}
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-center gap-4 mb-12 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
            )}
            <div>
              <p className="text-sm text-gray-600">Recipe by</p>
              <p className="text-lg font-semibold">{author.title}</p>
            </div>
          </Link>
        )}

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Ingredients</h2>
            <div className="bg-primary-50 rounded-xl p-8">
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Instructions */}
        {post.metadata?.instructions && (
          <div className="mb-12">
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-p:mb-4 prose-li:mb-2 prose-strong:text-primary-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.metadata.instructions}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="pt-8 border-t">
          <Link 
            href="/recipes"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Back to all recipes
          </Link>
        </div>
      </div>
    </article>
  )
}