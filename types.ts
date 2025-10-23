// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Dish interface
export interface Dish extends CosmicObject {
  type: 'dishes';
  metadata: {
    dish_name: string;
    description?: string;
    category?: {
      key: string;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    average_price_range?: string;
    dietary_type?: {
      key: string;
      value: string;
    };
  };
}

// Restaurant interface
export interface Restaurant extends CosmicObject {
  type: 'restaurants';
  metadata: {
    restaurant_name: string;
    platform?: {
      key: string;
      value: string;
    };
    logo?: {
      url: string;
      imgix_url: string;
    };
    location?: string;
    distance?: string;
    average_rating?: number;
    delivery_time?: string;
  };
}

// Dish Listing interface
export interface DishListing extends CosmicObject {
  type: 'dish-listings';
  metadata: {
    dish: Dish;
    restaurant: Restaurant;
    price: number;
    available: boolean;
    special_offer?: string | null;
    order_url?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
}

// Type literals for select-dropdown values
export type DishCategory = 'Pizza' | 'Indian' | 'Chinese' | 'Burgers' | 'Biryani' | 'Desserts';
export type Platform = 'Zomato' | 'Swiggy' | 'Dominos';
export type DietaryType = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Contains Egg';

// Type guards
export function isDish(obj: CosmicObject): obj is Dish {
  return obj.type === 'dishes';
}

export function isRestaurant(obj: CosmicObject): obj is Restaurant {
  return obj.type === 'restaurants';
}

export function isDishListing(obj: CosmicObject): obj is DishListing {
  return obj.type === 'dish-listings';
}