import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]
  
  // Get featured posts (first 3)
  const featuredPosts = posts.slice(0, 3)
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 text-white py-20 transition-colors duration-200">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Discover Delicious Recipes
            </h1>
            <p className="text-xl mb-8 text-primary-100 dark:text-primary-200">
              Explore mouth-watering dishes from talented chefs. From breakfast to desserts, find your next favorite recipe.
            </p>
            <Link 
              href="/recipes"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Browse All Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all p-8 text-center group border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.metadata?.description || 'Explore recipes'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Recipes</h2>
            <Link 
              href="/recipes"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <RecipeCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}