'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

interface SearchBarProps {
  defaultValue?: string
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for any dish (e.g., Biryani, Pizza, Paneer...)"
          className="w-full px-6 py-4 pr-14 text-lg rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}