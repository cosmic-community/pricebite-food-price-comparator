import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all dish listings with related data
export async function getDishListings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'dish-listings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dish listings');
  }
}

// Fetch all dishes
export async function getDishes() {
  try {
    const response = await cosmic.objects
      .find({ type: 'dishes' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch dishes');
  }
}

// Fetch all restaurants
export async function getRestaurants() {
  try {
    const response = await cosmic.objects
      .find({ type: 'restaurants' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch restaurants');
  }
}

// Search dishes by name
export async function searchDishes(query: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'dishes',
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    // Filter on client side for better search experience
    const filteredDishes = response.objects.filter((dish: any) => {
      const dishName = dish.metadata?.dish_name?.toLowerCase() || '';
      const title = dish.title?.toLowerCase() || '';
      const searchTerm = query.toLowerCase();
      return dishName.includes(searchTerm) || title.includes(searchTerm);
    });
    
    return filteredDishes;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search dishes');
  }
}