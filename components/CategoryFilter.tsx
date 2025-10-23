'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
  { key: 'all', label: 'All Categories' },
  { key: 'Pizza', label: '🍕 Pizza' },
  { key: 'Indian', label: '🍛 Indian' },
  { key: 'Chinese', label: '🥢 Chinese' },
  { key: 'Burgers', label: '🍔 Burgers' },
  { key: 'Biryani', label: '🍚 Biryani' },
  { key: 'Desserts', label: '🍰 Desserts' },
]

const platforms = [
  { key: 'all', label: 'All Platforms' },
  { key: 'Zomato', label: 'Zomato' },
  { key: 'Swiggy', label: 'Swiggy' },
  { key: 'Dominos', label: 'Dominos' },
]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || 'all'
  const currentPlatform = searchParams.get('platform') || 'all'
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/search?${params.toString()}`)
  }
  
  const handlePlatformChange = (platform: string) => {
    const params = new URLSearchParams(searchParams)
    if (platform === 'all') {
      params.delete('platform')
    } else {
      params.set('platform', platform)
    }
    router.push(`/search?${params.toString()}`)
  }
  
  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === category.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-500'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Platform Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Platform</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.key}
              onClick={() => handlePlatformChange(platform.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentPlatform === platform.key
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}