import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm transition-colors duration-200">
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-3xl">🍳</span>
            <span className="text-gray-900 dark:text-white">Delicious Recipes</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/recipes"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              Recipes
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}