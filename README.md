# 🍳 Delicious Recipes - Food Blog Platform

![App Preview](https://imgix.cosmicjs.com/4360ea50-ba6a-11f0-a34a-efbcf979242c-photo-1624353365286-3f8d62daad51-1762362600666.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautiful, modern food blog platform built with Next.js 16 and powered by Cosmic CMS. Discover delicious recipes from talented chefs, explore by category, and learn cooking techniques from experienced authors.

## ✨ Features

- 🎯 **Recipe Discovery** - Browse beautiful recipe cards with high-quality images
- 🏷️ **Category Filtering** - Filter recipes by Breakfast, Main Dishes, or Desserts
- 📖 **Detailed Recipe Pages** - Complete instructions, ingredients, cooking time, and servings
- 👨‍🍳 **Author Profiles** - Learn about the chefs with bios and social media links
- 📱 **Fully Responsive** - Perfect experience on all devices
- ⚡ **Next.js 16** - Built with the latest App Router architecture
- 🎨 **Modern Design** - Clean, appetizing interface with Tailwind CSS
- 🖼️ **Image Optimization** - Automatic optimization with imgix CDN

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=690b8401e2d9230df9d3ae69&clone_repository=690b85badab6858a67e48270)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a food blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a food blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **imgix** - Image optimization and delivery
- **React Markdown** - Markdown rendering for recipe instructions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with a bucket containing your food blog content
- Cosmic API keys (bucket slug, read key)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Recipes

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Recipe

```typescript
const response = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: recipeSlug
  })
  .depth(1)

const post = response.object
```

### Filtering by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic CMS to manage all content:

### Content Types

- **Posts** - Recipe content with description, ingredients, instructions, cooking time, servings, featured image
- **Categories** - Recipe categories (Breakfast, Main Dishes, Desserts)
- **Authors** - Chef profiles with bio, profile photo, and social media links

### Object Relationships

The app leverages Cosmic's object metafields to create relationships:
- Each Post has an Author (object metafield)
- Each Post has a Category (object metafield)
- These relationships are automatically populated using `depth(1)` parameter

### Image Optimization

All images are optimized using imgix parameters:
```typescript
{post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress
```

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Connect your repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project settings or hosting platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## 📝 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with featured recipes
│   ├── recipes/
│   │   ├── page.tsx        # All recipes with filtering
│   │   └── [slug]/
│   │       └── page.tsx    # Individual recipe page
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx    # Author profile page
│   └── categories/
│       └── [slug]/
│           └── page.tsx    # Category page
├── components/
│   ├── RecipeCard.tsx      # Recipe card component
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   └── CosmicBadge.tsx     # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript type definitions
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own food blog!

<!-- README_END -->