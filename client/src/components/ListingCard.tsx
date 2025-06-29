import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Gamepad2, Tv, Gift, Key } from "lucide-react";
import type { Listing } from "@shared/schema";

interface ListingCardProps {
  listing: Listing;
}

const getCategoryIcon = (platform: string) => {
  const lower = platform?.toLowerCase() || "";
  if (lower.includes("game") || lower.includes("fortnite") || lower.includes("steam")) return Gamepad2;
  if (lower.includes("netflix") || lower.includes("streaming")) return Tv;
  if (lower.includes("gift") || lower.includes("card")) return Gift;
  return Key;
};

const getCategoryGradient = (platform: string) => {
  const lower = platform?.toLowerCase() || "";
  if (lower.includes("game") || lower.includes("fortnite")) return "from-blue-500 to-purple-600";
  if (lower.includes("netflix") || lower.includes("streaming")) return "from-purple-500 to-pink-600";
  if (lower.includes("gift") || lower.includes("steam")) return "from-orange-500 to-red-600";
  return "from-green-500 to-emerald-600";
};

export default function ListingCard({ listing }: ListingCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const Icon = getCategoryIcon(listing.platform || "");
  const gradient = getCategoryGradient(listing.platform || "");
  
  const handleCardClick = () => {
    window.location.href = `/listing/${listing.id}`;
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Buy clicked for listing:", listing.id);
    // TODO: Implement purchase flow
  };

  // Mock seller data since we don't have seller relation in this query
  const mockSellerRating = 4.8;
  const mockSellerReviews = Math.floor(Math.random() * 200) + 50;

  return (
    <Card 
      className="bg-gradient-card border border-kalluba-darker rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-kalluba-gold/10 transition-all group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        {!imageError && listing.imageUrl ? (
          <img 
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-48 bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform`}>
            <Icon className="text-white text-4xl" size={48} />
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-green-500 text-white hover:bg-green-500">
            VERIFIED
          </Badge>
        </div>
        
        {listing.isInstantDelivery && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-blue-500 text-white hover:bg-blue-500">
              INSTANT
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <h3 className="font-bold text-white mb-2 line-clamp-1">
          {listing.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-kalluba-gold font-bold text-lg">
            ${parseFloat(listing.price).toFixed(2)}
          </div>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="text-xs fill-current" size={12} />
            <span className="text-sm">{mockSellerRating}</span>
            <span className="text-gray-400 text-sm">({mockSellerReviews})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="" alt="Seller" />
              <AvatarFallback className="bg-kalluba-gold text-kalluba-navy text-xs">
                S
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400">Seller</span>
          </div>
          
          <Button 
            onClick={handleBuyClick}
            className="bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400 text-sm px-4 py-2"
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
