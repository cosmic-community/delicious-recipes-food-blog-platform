// Base Cosmic object interface
interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    social_media?: {
      instagram?: string
      twitter?: string
      youtube?: string
      website?: string
    }
  }
}

// Post type
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    description?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    ingredients?: string
    instructions?: string
    cooking_time?: number
    servings?: number
    author?: Author
    category?: Category
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guard for posts
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

// Type guard for categories
export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

// Type guard for authors
export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors'
}