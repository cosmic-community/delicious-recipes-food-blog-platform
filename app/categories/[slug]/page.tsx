// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import { notFound } from 'next/navigation'
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getAllCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/recipes"
            className="inline-block text-primary-600 hover:text-primary-700 font-semibold mb-4"
          >
            ← All Recipes
          </Link>
          <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Recipes */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <RecipeCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              No recipes in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  )
}