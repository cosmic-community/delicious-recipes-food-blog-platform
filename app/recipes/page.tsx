import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import RecipeCard from '@/components/RecipeCard'
import CategoryFilter from '@/components/CategoryFilter'

export const revalidate = 60

export default async function RecipesPage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]
  
  return (
    <div className="py-16">
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">All Recipes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover our complete collection of delicious recipes
          </p>
        </div>

        <CategoryFilter categories={categories} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <RecipeCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  )
}