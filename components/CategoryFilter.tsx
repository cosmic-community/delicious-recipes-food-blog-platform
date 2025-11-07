'use client'

import { Category } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <Link
        href="/recipes"
        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
          pathname === '/recipes'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All Recipes
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            pathname === `/categories/${category.slug}`
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}