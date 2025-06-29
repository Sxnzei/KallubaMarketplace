import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ListingCard from "./ListingCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedListings() {
  const { data: listings, isLoading } = useQuery({
    queryKey: ["/api/listings"],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleViewAll = () => {
    console.log("View all clicked");
    // TODO: Navigate to listings page
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-kalluba-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Hot Deals</h2>
              <p className="text-gray-400">Trending digital assets and premium accounts</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gradient-card border border-kalluba-darker rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <section className="py-16 bg-kalluba-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Hot Deals</h2>
            <p className="text-gray-400">No listings available at the moment</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-kalluba-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Hot Deals</h2>
            <p className="text-gray-400">Trending digital assets and premium accounts</p>
          </div>
          <Button 
            variant="ghost"
            onClick={handleViewAll}
            className="text-kalluba-gold hover:text-yellow-400 font-medium"
          >
            View All <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.slice(0, 4).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
