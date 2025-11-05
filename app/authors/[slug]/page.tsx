// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const authors = await getAllAuthors() as Author[]
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]
  const profilePhoto = author.metadata?.profile_photo
  const socialMedia = author.metadata?.social_media

  return (
    <div className="py-16">
      <div className="container">
        {/* Author Profile */}
        <div className="max-w-4xl mx-auto mb-16">
          <Link 
            href="/recipes"
            className="inline-block text-primary-600 hover:text-primary-700 font-semibold mb-8"
          >
            ← All Recipes
          </Link>
          
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {profilePhoto && (
                <img
                  src={`${profilePhoto.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                  width={160}
                  height={160}
                />
              )}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4">{author.title}</h1>
                {author.metadata?.bio && (
                  <p className="text-lg text-gray-700 mb-6">
                    {author.metadata.bio}
                  </p>
                )}
                {socialMedia && (
                  <div className="flex gap-4 justify-center md:justify-start">
                    {socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Instagram
                      </a>
                    )}
                    {socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Twitter
                      </a>
                    )}
                    {socialMedia.youtube && (
                      <a
                        href={`https://youtube.com/${socialMedia.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        YouTube
                      </a>
                    )}
                    {socialMedia.website && (
                      <a
                        href={socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Author's Recipes */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Recipes by {author.title}
          </h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <RecipeCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                No recipes from this author yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}