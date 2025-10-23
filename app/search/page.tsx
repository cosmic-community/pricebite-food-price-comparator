import { getDishListings } from '@/lib/cosmic'
import { DishListing } from '@/types'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import PriceComparisonCard from '@/components/PriceComparisonCard'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; platform?: string; category?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const platform = params.platform
  const category = params.category
  
  let listings = await getDishListings() as DishListing[]
  
  // Filter by search query
  if (query) {
    listings = listings.filter((listing) => {
      const dishName = listing.metadata?.dish?.metadata?.dish_name?.toLowerCase() || ''
      const restaurantName = listing.metadata?.restaurant?.metadata?.restaurant_name?.toLowerCase() || ''
      const searchTerm = query.toLowerCase()
      return dishName.includes(searchTerm) || restaurantName.includes(searchTerm)
    })
  }
  
  // Filter by platform
  if (platform) {
    listings = listings.filter((listing) => {
      const listingPlatform = listing.metadata?.restaurant?.metadata?.platform?.value
      return listingPlatform === platform
    })
  }
  
  // Filter by category
  if (category) {
    listings = listings.filter((listing) => {
      const dishCategory = listing.metadata?.dish?.metadata?.category?.value
      return dishCategory === category
    })
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar defaultValue={query} />
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {query ? `Search Results for "${query}"` : 'All Dishes'}
          </h2>
          <p className="text-gray-600">
            Found {listings.length} {listings.length === 1 ? 'result' : 'results'}
            {platform && ` on ${platform}`}
            {category && ` in ${category}`}
          </p>
        </div>
        
        {listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <PriceComparisonCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}