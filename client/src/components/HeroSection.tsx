import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserCircle, Crown, Gift, Key } from "lucide-react";

const categories = [
  {
    icon: UserCircle,
    title: "Accounts",
    description: "Premium gaming & social accounts",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Crown,
    title: "Subscriptions",
    description: "Netflix, Spotify, Premium services",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Gift,
    title: "Gift Cards",
    description: "Amazon, Steam, iTunes & more",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    icon: Key,
    title: "Software",
    description: "Licenses, tools & digital assets",
    gradient: "from-purple-500 to-pink-600"
  }
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: Implement search navigation
    }
  };

  const handleCategoryClick = (category: string) => {
    console.log("Category clicked:", category);
    // TODO: Navigate to category page
  };

  return (
    <section className="bg-gradient-hero py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Discover the Ultimate</span>
            <br />
            <span className="text-gradient-gold">Digital Marketplace</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trade digital assets, premium accounts, and exclusive subscriptions with worldwide buyers and sellers
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for accounts, subscriptions, gift cards and more..." 
              className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-kalluba-gold focus:border-transparent"
            />
            <Button 
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400"
            >
              <Search className="mr-2" size={16} />
              Search
            </Button>
          </div>
        </div>

        {/* Category Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer group"
              onClick={() => handleCategoryClick(category.title)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon className="text-xl text-white" size={24} />
                </div>
                <h3 className="font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-gray-300">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
