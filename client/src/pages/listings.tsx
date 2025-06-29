import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";

export default function Listings() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    document.title = "Browse Marketplace - Kalluba | Digital Assets & Premium Accounts";
  }, []);

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
    staleTime: 5 * 60 * 1000,
  });

  const { data: listings, isLoading } = useQuery({
    queryKey: ["/api/listings"],
    staleTime: 2 * 60 * 1000,
  });

  // Filter and sort listings
  const filteredListings = listings?.filter(listing => {
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.platform?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      listing.categoryId.toString() === selectedCategory;
    
    const price = parseFloat(listing.price);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  }) || [];

  const handleSearch = () => {
    // Search is handled by the filter above
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("newest");
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-kalluba-navy text-white">
      <Header />
      
      {/* Search & Filters Header */}
      <section className="bg-kalluba-dark border-b border-kalluba-darker py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for accounts, subscriptions, gift cards..."
                className="w-full pl-12 pr-4 py-3 bg-kalluba-darker border-kalluba-darker text-white placeholder-gray-400 focus:ring-2 focus:ring-kalluba-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 bg-kalluba-darker border-kalluba-darker text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-kalluba-dark border-kalluba-darker">
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-kalluba-darker border-kalluba-darker text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-kalluba-dark border-kalluba-darker">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-kalluba-gold text-kalluba-navy" : "text-gray-400"}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-kalluba-gold text-kalluba-navy" : "text-gray-400"}
              >
                <List size={16} />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all" || sortBy !== "newest") && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="bg-kalluba-darker text-white">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-kalluba-darker text-white">
                  Category: {categories?.find(c => c.id.toString() === selectedCategory)?.name}
                </Badge>
              )}
              {sortBy !== "newest" && (
                <Badge variant="secondary" className="bg-kalluba-darker text-white">
                  Sort: {sortBy}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-kalluba-gold hover:text-yellow-400 text-sm"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Digital Marketplace
              </h1>
              <p className="text-gray-400">
                {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gradient-card border border-kalluba-darker rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-4">No listings found</div>
              <p className="text-gray-500">Try adjusting your search criteria or check back later for new listings.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {filteredListings.map((listing) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing}
                />
              ))}
            </div>
          )}

          {/* Load More (placeholder for pagination) */}
          {filteredListings.length >= 20 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-kalluba-darker text-white hover:bg-kalluba-darker"
              >
                Load More Listings
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}