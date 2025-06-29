import { db } from "./db";
import { categories, listings, users } from "@shared/schema";

const sampleCategories = [
  {
    name: "Gaming Accounts",
    slug: "gaming-accounts",
    description: "Premium gaming accounts for various platforms",
    icon: "gamepad",
    isActive: true
  },
  {
    name: "Streaming Services",
    slug: "streaming-services", 
    description: "Netflix, Spotify, Disney+ and other streaming subscriptions",
    icon: "tv",
    isActive: true
  },
  {
    name: "Gift Cards",
    slug: "gift-cards",
    description: "Digital gift cards for popular retailers and services",
    icon: "gift",
    isActive: true
  },
  {
    name: "Software Licenses",
    slug: "software-licenses",
    description: "Software licenses and digital tools",
    icon: "key",
    isActive: true
  }
];

const sampleUsers = [
  {
    id: "seller1",
    email: "seller1@example.com",
    firstName: "John",
    lastName: "Doe",
    profileImageUrl: null,
    isVerified: true,
    walletBalance: "1250.00",
    totalSales: "15000.00",
    sellerRating: "4.8",
    completedOrders: 147
  },
  {
    id: "seller2", 
    email: "seller2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    profileImageUrl: null,
    isVerified: true,
    walletBalance: "850.00",
    totalSales: "8900.00",
    sellerRating: "4.6",
    completedOrders: 89
  }
];

const sampleListings = [
  {
    sellerId: "seller1",
    categoryId: 1,
    title: "Netflix Premium Account - 4K UHD Access",
    description: "Premium Netflix account with 4K streaming, multiple profiles, and global access. Account comes with email access for password changes. Guaranteed to work for 12 months or replacement provided.",
    price: "29.99",
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
    platform: "Netflix",
    accountDetails: {
      "screens": 4,
      "quality": "4K UHD",
      "region": "Global",
      "warranty": "12 months"
    },
    isInstantDelivery: true,
    status: "active",
    views: 243
  },
  {
    sellerId: "seller1", 
    categoryId: 1,
    title: "Spotify Premium Family Plan - 6 Accounts",
    description: "Spotify Premium Family subscription for up to 6 users. Ad-free music, offline downloads, unlimited skips. Fresh account with full access.",
    price: "24.99",
    imageUrl: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=400",
    platform: "Spotify",
    accountDetails: {
      "users": 6,
      "features": ["Ad-free", "Offline downloads", "Unlimited skips"],
      "duration": "1 month"
    },
    isInstantDelivery: true,
    status: "active", 
    views: 189
  },
  {
    sellerId: "seller2",
    categoryId: 2,
    title: "Fortnite Account - Rare Skins & V-Bucks",
    description: "Epic Fortnite account with rare skins including Black Knight, Skull Trooper, and more. 5000+ V-Bucks included. Level 250+ with many exclusive items.",
    price: "299.99",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    platform: "Fortnite",
    accountDetails: {
      "skins": ["Black Knight", "Skull Trooper", "Renegade Raider"],
      "vbucks": 5000,
      "level": 250,
      "season": "Chapter 4"
    },
    isInstantDelivery: false,
    status: "active",
    views: 567
  },
  {
    sellerId: "seller2",
    categoryId: 3,
    title: "Amazon Gift Card - $100 Value",
    description: "Valid Amazon gift card worth $100. Can be used for any purchases on Amazon.com. Digital delivery within minutes of purchase.",
    price: "95.00",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    platform: "Amazon",
    accountDetails: {
      "value": "$100",
      "region": "US",
      "expiry": "Never expires"
    },
    isInstantDelivery: true,
    status: "active",
    views: 89
  },
  {
    sellerId: "seller1",
    categoryId: 4,
    title: "Microsoft Office 365 Pro Plus License",
    description: "Genuine Microsoft Office 365 Professional Plus license key. Includes Word, Excel, PowerPoint, Outlook, Teams, and more. 1TB OneDrive storage included.",
    price: "49.99",
    imageUrl: "https://images.unsplash.com/photo-1633114128814-2dd83d67dece?w=400",
    platform: "Microsoft",
    accountDetails: {
      "apps": ["Word", "Excel", "PowerPoint", "Outlook", "Teams"],
      "storage": "1TB OneDrive",
      "devices": "5 devices",
      "duration": "1 year"
    },
    isInstantDelivery: true,
    status: "active",
    views: 156
  },
  {
    sellerId: "seller2",
    categoryId: 1,
    title: "Disney+ Premium Account - 4K & Downloads",
    description: "Disney+ premium subscription with 4K streaming, offline downloads, and access to entire Disney catalog including Marvel, Star Wars, and Pixar content.",
    price: "19.99",
    imageUrl: "https://images.unsplash.com/photo-1489599904948-f72a4b996c0d?w=400", 
    platform: "Disney+",
    accountDetails: {
      "quality": "4K",
      "downloads": "Unlimited",
      "profiles": 7,
      "content": ["Disney", "Marvel", "Star Wars", "Pixar", "National Geographic"]
    },
    isInstantDelivery: true,
    status: "active",
    views: 201
  }
];

export async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Insert categories
    console.log("Adding categories...");
    for (const category of sampleCategories) {
      await db.insert(categories).values(category).onConflictDoNothing();
    }

    // Insert sample users
    console.log("Adding sample users...");
    for (const user of sampleUsers) {
      await db.insert(users).values(user).onConflictDoNothing();
    }

    // Insert listings
    console.log("Adding sample listings...");
    for (const listing of sampleListings) {
      await db.insert(listings).values(listing).onConflictDoNothing();
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}