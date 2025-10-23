# PriceBite - Food Price Comparator

![App Preview](https://imgix.cosmicjs.com/729f8410-b034-11f0-81b9-c9cceef2f467-photo-1631452180519-c014fe946bc7-1761239957297.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern food price comparison platform that helps users find the best deals across Zomato, Swiggy, and Dominos. Search for any dish and instantly compare prices, delivery times, and special offers from nearby restaurants.

## ✨ Features

- 🔍 **Smart Search** - Search any dish and see all available options across platforms
- 💰 **Price Comparison** - Compare prices side-by-side with visual best-deal indicators
- 🏪 **Platform Filtering** - Filter by Zomato, Swiggy, or Dominos
- 🍕 **Category Browse** - Browse by Pizza, Indian, Chinese, Biryani, Burgers, Desserts
- ⭐ **Restaurant Info** - Ratings, delivery times, distances, and locations
- 🎁 **Special Offers** - See active discounts and promotions
- 📱 **Responsive Design** - Seamless experience on desktop and mobile
- 🔗 **Direct Ordering** - One-click ordering through platform links

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fa5fd792c9229c30fe1815&clone_repository=68fa66d892c9229c30fe1942)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a fully functional Food Price Comparator App where users can search for any dish, and the app will automatically compare its prices and availability across major food delivery platforms like Zomato, Swiggy, and Dominos.
>
> Features to include:
>
> Dish Search Bar:
>
> User can type or voice-search any dish name (e.g., "Margherita Pizza", "Paneer Butter Masala").
>
> As soon as the user searches, the app fetches real-time data from Zomato, Swiggy, Dominos (and others if possible).
>
> Price Comparison System:
>
> Show which platform offers the searched dish at the lowest, average, and highest price.
>
> Highlight the most reasonable platform in green.
>
> Include restaurant name, distance, and delivery time.
>
> Nearby Availability:
>
> Use GPS or location services to show which nearby restaurants or outlets serve that dish.
>
> Display map view and list view both.
>
> Order Integration Button:
>
> Each result should have a "Order on Zomato" / "Order on Swiggy" / "Order on Dominos" button.
>
> When tapped, it should redirect the user directly to that platform's order page for that dish.
>
> UI Design:
>
> Clean, modern, and easy to navigate.
>
> Use a Material Design 3 theme with red, orange, and white tones for food vibes.
>
> Include smooth loading animations while fetching price data.
>
> Optional Smart Features (if supported by Vibe tools):
>
> Filter & Sort: by price, rating, delivery time, or distance.
>
> Favorites: Users can save dishes or restaurants.
>
> Recent Searches: Auto-suggest based on history.
>
> Push Notifications: Notify users when their favorite dish is available at a discount.
>
> Backend Requirements:
>
> Use API integration with Zomato, Swiggy, and Dominos.
>
> Implement caching to reduce load time.
>
> Ensure secure and optimized API calls.
>
> App Name:-
> "PriceBite""

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Lucide React** - Modern icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the PriceBite bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd pricebite
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching All Dish Listings with Related Data

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: listings } = await cosmic.objects
  .find({ type: 'dish-listings' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes related dish and restaurant objects

// listings now contains full dish and restaurant data
```

### Searching Dishes by Name

```typescript
const searchQuery = 'biryani'
const { objects: dishes } = await cosmic.objects
  .find({
    type: 'dishes',
    'metadata.dish_name': { $regex: searchQuery, $options: 'i' }
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Filtering by Platform

```typescript
const platform = 'Swiggy'
const { objects: listings } = await cosmic.objects
  .find({
    type: 'dish-listings',
    'metadata.restaurant.metadata.platform.value': platform
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application uses three main Object Types from your Cosmic bucket:

1. **Dishes** - Core dish information with categories and dietary types
2. **Restaurants** - Restaurant profiles with platform and location data
3. **Dish Listings** - Price comparison entries linking dishes to restaurants

The content model supports:
- Object relationships (dishes and restaurants connected to listings)
- Select-dropdown fields for categories and platforms
- File uploads for dish images and restaurant logos
- Switch fields for availability status
- Number fields for pricing and ratings

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

1. Click the deploy button above
2. Connect your repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=your-repo-url)

1. Click the deploy button above
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Deploy!

## 📝 License

MIT License - feel free to use this project for your own applications!

<!-- README_END -->