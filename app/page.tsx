import { getDishListings } from '@/lib/cosmic'
import { DishListing } from '@/types'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import PriceComparisonCard from '@/components/PriceComparisonCard'
import CategoryFilter from '@/components/CategoryFilter'

export default async function Home() {
  const listings = await getDishListings() as DishListing[]
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Find the Best Food Deals
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Compare prices across Zomato, Swiggy, and Dominos instantly
          </p>
          
          <SearchBar />
        </section>
        
        {/* Category Filter */}
        <CategoryFilter />
        
        {/* Dish Listings */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Available Dishes</h2>
          
          {listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No dishes available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <PriceComparisonCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}