import { getAboutPage } from '@/lib/cosmic'
import { AboutPage } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const revalidate = 60

export default async function About() {
  const aboutPage = await getAboutPage() as AboutPage | null
  
  // Default content if no about page is found in Cosmic
  if (!aboutPage) {
    return (
      <div className="py-16">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Welcome to Delicious Recipes! We're passionate about sharing amazing food experiences with the world.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our mission is to inspire home cooks with beautiful, delicious, and achievable recipes from talented chefs around the world.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            To customize this page, create an "About Pages" object in your Cosmic CMS dashboard with the slug "about".
          </p>
        </div>
      </div>
    )
  }

  const featuredImage = aboutPage.metadata?.featured_image
  // Changed: Added type safety check to ensure team_members is an array
  const teamMembers = Array.isArray(aboutPage.metadata?.team_members) ? aboutPage.metadata.team_members : []

  return (
    <div className="py-16">
      <div className="container max-w-4xl">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">{aboutPage.title}</h1>
          
          {aboutPage.metadata?.headline && (
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 font-medium">
              {aboutPage.metadata.headline}
            </p>
          )}

          {featuredImage && (
            <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
              <img
                src={`${featuredImage.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
                alt={aboutPage.title}
                className="w-full h-auto"
                width={800}
                height={300}
              />
            </div>
          )}

          {aboutPage.metadata?.description && (
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aboutPage.metadata.description}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Mission Section */}
        {aboutPage.metadata?.mission && (
          <div className="mb-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
            <div className="prose prose-lg max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aboutPage.metadata.mission}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                  {member.photo && (
                    <img
                      src={`${member.photo.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                      width={96}
                      height={96}
                    />
                  )}
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700 dark:text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}