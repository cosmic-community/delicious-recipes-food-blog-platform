import { Post } from '@/types'
import Link from 'next/link'

interface RecipeCardProps {
  post: Post
}

export default function RecipeCard({ post }: RecipeCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <Link
      href={`/recipes/${post.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
    >
      {featuredImage && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={250}
          />
        </div>
      )}
      
      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-3">
            {category.title}
          </span>
        )}
        
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
        
        {post.metadata?.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.metadata.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {author && (
            <div className="flex items-center gap-2">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
              )}
              <span>{author.title}</span>
            </div>
          )}
          
          {post.metadata?.cooking_time && (
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{post.metadata.cooking_time} min</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}