import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <nav className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-3xl">🍳</span>
            <span>Delicious Recipes</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/recipes"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Recipes
            </Link>
            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}