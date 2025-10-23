import { DishListing } from '@/types'
import { MapPin, Clock, Star, ExternalLink } from 'lucide-react'

interface PriceComparisonCardProps {
  listing: DishListing
}

export default function PriceComparisonCard({ listing }: PriceComparisonCardProps) {
  const dish = listing.metadata?.dish
  const restaurant = listing.metadata?.restaurant
  const price = listing.metadata?.price
  const available = listing.metadata?.available
  const specialOffer = listing.metadata?.special_offer
  const orderUrl = listing.metadata?.order_url
  
  if (!dish || !restaurant) {
    return null
  }
  
  const dishImage = dish.metadata?.featured_image?.imgix_url
  const dishName = dish.metadata?.dish_name || dish.title
  const dishDescription = dish.metadata?.description
  const category = dish.metadata?.category?.value
  const dietaryType = dish.metadata?.dietary_type?.value
  
  const restaurantName = restaurant.metadata?.restaurant_name || restaurant.title
  const platform = restaurant.metadata?.platform?.value
  const location = restaurant.metadata?.location
  const distance = restaurant.metadata?.distance
  const rating = restaurant.metadata?.average_rating
  const deliveryTime = restaurant.metadata?.delivery_time
  
  // Platform colors
  const platformColors: Record<string, string> = {
    'Zomato': 'bg-red-500',
    'Swiggy': 'bg-orange-500',
    'Dominos': 'bg-blue-500',
  }
  
  const platformColor = platform ? platformColors[platform] || 'bg-gray-500' : 'bg-gray-500'
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Dish Image */}
      {dishImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${dishImage}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={dishName}
            className="w-full h-full object-cover"
          />
          {!available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-xl font-bold">Currently Unavailable</span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-5">
        {/* Dish Info */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{dishName}</h3>
            {category && (
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                {category}
              </span>
            )}
          </div>
          {dishDescription && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{dishDescription}</p>
          )}
          {dietaryType && (
            <span className="text-xs text-gray-500">{dietaryType}</span>
          )}
        </div>
        
        {/* Restaurant Info */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{restaurantName}</h4>
            {platform && (
              <span className={`px-3 py-1 text-xs font-bold text-white rounded ${platformColor}`}>
                {platform}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">{location}</span>
              </div>
            )}
            {distance && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">{distance} away</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{rating}</span>
              </div>
            )}
            {deliveryTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{deliveryTime}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Price & Order */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-orange-600">₹{price}</span>
            </div>
          </div>
          
          {specialOffer && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-sm font-medium text-green-800">🎁 {specialOffer}</p>
            </div>
          )}
          
          {orderUrl && available && (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full py-3 px-4 text-center text-white font-semibold rounded-lg ${platformColor} hover:opacity-90 transition-opacity`}
            >
              <span className="flex items-center justify-center gap-2">
                Order on {platform || 'Platform'}
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}