import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'

export default function Header() {
  return (
    <header className="gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <UtensilsCrossed className="w-8 h-8" />
            <h1 className="text-2xl font-bold">PriceBite</h1>
          </Link>
          
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:underline">
                  Browse
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}