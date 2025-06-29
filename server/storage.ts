import {
  users,
  categories,
  listings,
  orders,
  walletTransactions,
  reviews,
  type User,
  type UpsertUser,
  type Category,
  type InsertCategory,
  type Listing,
  type InsertListing,
  type Order,
  type InsertOrder,
  type WalletTransaction,
  type InsertWalletTransaction,
  type Review,
  type InsertReview,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Listing operations
  getListings(limit?: number): Promise<Listing[]>;
  getListingById(id: number): Promise<Listing | undefined>;
  getListingsBySeller(sellerId: string): Promise<Listing[]>;
  getListingsByCategory(categoryId: number): Promise<Listing[]>;
  createListing(listing: InsertListing): Promise<Listing>;
  updateListing(id: number, updates: Partial<InsertListing>): Promise<Listing | undefined>;
  deleteListing(id: number): Promise<boolean>;

  // Order operations
  getOrdersByUser(userId: string): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Wallet operations
  getWalletTransactions(userId: string, limit?: number): Promise<WalletTransaction[]>;
  createWalletTransaction(transaction: InsertWalletTransaction): Promise<WalletTransaction>;
  updateUserWalletBalance(userId: string, amount: string): Promise<User | undefined>;

  // Review operations
  getReviewsForUser(userId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Statistics
  getMarketplaceStats(): Promise<{
    totalUsers: number;
    completedTransactions: string;
    avgDeliveryTime: string;
    averageRating: string;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.isActive, true));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  // Listing operations
  async getListings(limit = 20): Promise<Listing[]> {
    return await db
      .select()
      .from(listings)
      .where(eq(listings.status, "active"))
      .orderBy(desc(listings.createdAt))
      .limit(limit);
  }

  async getListingById(id: number): Promise<Listing | undefined> {
    const [listing] = await db.select().from(listings).where(eq(listings.id, id));
    return listing;
  }

  async getListingsBySeller(sellerId: string): Promise<Listing[]> {
    return await db
      .select()
      .from(listings)
      .where(and(eq(listings.sellerId, sellerId), eq(listings.status, "active")))
      .orderBy(desc(listings.createdAt));
  }

  async getListingsByCategory(categoryId: number): Promise<Listing[]> {
    return await db
      .select()
      .from(listings)
      .where(and(eq(listings.categoryId, categoryId), eq(listings.status, "active")))
      .orderBy(desc(listings.createdAt));
  }

  async createListing(listing: InsertListing): Promise<Listing> {
    const [newListing] = await db.insert(listings).values(listing).returning();
    return newListing;
  }

  async updateListing(id: number, updates: Partial<InsertListing>): Promise<Listing | undefined> {
    const [updatedListing] = await db
      .update(listings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(listings.id, id))
      .returning();
    return updatedListing;
  }

  async deleteListing(id: number): Promise<boolean> {
    const result = await db.update(listings).set({ status: "deleted" }).where(eq(listings.id, id));
    return result.rowCount > 0;
  }

  // Order operations
  async getOrdersByUser(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(sql`${orders.buyerId} = ${userId} OR ${orders.sellerId} = ${userId}`)
      .orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const updateData: any = { status };
    if (status === "completed") {
      updateData.completedAt = new Date();
      updateData.escrowReleased = true;
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }

  // Wallet operations
  async getWalletTransactions(userId: string, limit = 10): Promise<WalletTransaction[]> {
    return await db
      .select()
      .from(walletTransactions)
      .where(eq(walletTransactions.userId, userId))
      .orderBy(desc(walletTransactions.createdAt))
      .limit(limit);
  }

  async createWalletTransaction(transaction: InsertWalletTransaction): Promise<WalletTransaction> {
    const [newTransaction] = await db.insert(walletTransactions).values(transaction).returning();
    return newTransaction;
  }

  async updateUserWalletBalance(userId: string, amount: string): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ walletBalance: amount, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Review operations
  async getReviewsForUser(userId: string): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.revieweeId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  // Statistics
  async getMarketplaceStats(): Promise<{
    totalUsers: number;
    completedTransactions: string;
    avgDeliveryTime: string;
    averageRating: string;
  }> {
    const [userStats] = await db.select({ count: sql<number>`count(*)` }).from(users);
    
    const [transactionStats] = await db
      .select({ 
        totalAmount: sql<string>`COALESCE(SUM(${orders.amount}), 0)`,
        completedCount: sql<number>`COUNT(*)`
      })
      .from(orders)
      .where(eq(orders.status, "completed"));

    const [ratingStats] = await db
      .select({ avgRating: sql<string>`COALESCE(AVG(${reviews.rating}), 0)` })
      .from(reviews);

    return {
      totalUsers: userStats?.count || 0,
      completedTransactions: `$${parseFloat(transactionStats?.totalAmount || "0").toFixed(1)}M`,
      avgDeliveryTime: "12 MIN", // This would need more complex calculation based on order timestamps
      averageRating: parseFloat(ratingStats?.avgRating || "0").toFixed(1),
    };
  }
}

export const storage = new DatabaseStorage();
