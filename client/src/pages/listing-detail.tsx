import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, Shield, Clock, MessageCircle, Heart, Share2, Flag, Gamepad2, Tv, Gift, Key } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function ListingDetail() {
  const [match, params] = useRoute("/listing/:id");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const listingId = params?.id ? parseInt(params.id) : null;

  const { data: listing, isLoading } = useQuery({
    queryKey: ["/api/listings", listingId],
    enabled: !!listingId,
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (listing) {
      document.title = `${listing.title} - Kalluba | Digital Marketplace`;
    }
  }, [listing]);

  const purchaseMutation = useMutation({
    mutationFn: async (data: { sellerId: string; listingId: number; amount: string; paymentMethod: string }) => {
      return await apiRequest("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Purchase Successful",
        description: "Your order has been created and is pending seller confirmation.",
      });
      setShowPurchaseDialog(false);
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getCategoryIcon = (platform: string) => {
    const lower = platform?.toLowerCase() || "";
    if (lower.includes("game") || lower.includes("fortnite") || lower.includes("steam")) return Gamepad2;
    if (lower.includes("netflix") || lower.includes("streaming")) return Tv;
    if (lower.includes("gift") || lower.includes("card")) return Gift;
    return Key;
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a purchase.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }

    if (!listing) return;

    purchaseMutation.mutate({
      sellerId: listing.sellerId,
      listingId: listing.id,
      amount: listing.price,
      paymentMethod: "wallet"
    });
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to contact the seller.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
    
    toast({
      title: "Feature Coming Soon",
      description: "Direct messaging with sellers will be available soon.",
    });
  };

  if (!match || !listingId) {
    return <div>Listing not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-kalluba-navy text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-kalluba-dark rounded-xl h-96"></div>
              <div className="space-y-4">
                <div className="bg-kalluba-dark rounded h-8 w-3/4"></div>
                <div className="bg-kalluba-dark rounded h-4 w-1/2"></div>
                <div className="bg-kalluba-dark rounded h-6 w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-kalluba-navy text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Listing Not Found</h1>
          <p className="text-gray-400">The listing you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = getCategoryIcon(listing.platform || "");
  const mockSellerRating = 4.8;
  const mockSellerReviews = Math.floor(Math.random() * 200) + 50;
  const mockImages = [listing.imageUrl].filter(Boolean);

  return (
    <div className="min-h-screen bg-kalluba-navy text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-0">
                <div className="relative">
                  {mockImages.length > 0 ? (
                    <img 
                      src={mockImages[selectedImageIndex]}
                      alt={listing.title}
                      className="w-full h-96 object-cover rounded-t-xl"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl flex items-center justify-center">
                      <Icon className="text-white text-6xl" size={96} />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className="bg-green-500 text-white hover:bg-green-500">
                      VERIFIED
                    </Badge>
                    {listing.isInstantDelivery && (
                      <Badge className="bg-blue-500 text-white hover:bg-blue-500">
                        INSTANT DELIVERY
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button variant="ghost" size="sm" className="bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                      <Heart size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                      <Share2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-black bg-opacity-50 text-white hover:bg-opacity-70">
                      <Flag size={16} />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {mockImages.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {mockImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className={`w-16 h-16 object-cover rounded cursor-pointer ${
                          selectedImageIndex === index ? 'ring-2 ring-kalluba-gold' : ''
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-gradient-card border border-kalluba-darker mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
                
                {listing.accountDetails && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Account Details</h4>
                    <div className="bg-kalluba-darker rounded-lg p-4">
                      <pre className="text-gray-300 text-sm">
                        {JSON.stringify(listing.accountDetails, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Purchase Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-white mb-2">{listing.title}</h1>
                <p className="text-gray-400 mb-4">Platform: {listing.platform}</p>
                
                <div className="text-3xl font-bold text-kalluba-gold mb-6">
                  ${parseFloat(listing.price).toFixed(2)}
                </div>

                <div className="space-y-3 mb-6">
                  <Button 
                    onClick={handlePurchase}
                    disabled={purchaseMutation.isPending}
                    className="w-full bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400 font-bold py-3"
                  >
                    {purchaseMutation.isPending ? "Processing..." : "Buy Now"}
                  </Button>
                  
                  <Button 
                    onClick={handleContactSeller}
                    variant="outline"
                    className="w-full border-kalluba-darker text-white hover:bg-kalluba-darker"
                  >
                    <MessageCircle className="mr-2" size={16} />
                    Contact Seller
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Delivery Time:</span>
                    <span className="text-white">
                      {listing.isInstantDelivery ? "Instant" : "1-24 hours"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Protection:</span>
                    <div className="flex items-center space-x-1">
                      <Shield className="text-green-400" size={14} />
                      <span className="text-green-400">Escrow Protected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Views:</span>
                    <span className="text-white">{listing.views || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Seller Information</h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" alt="Seller" />
                    <AvatarFallback className="bg-kalluba-gold text-kalluba-navy">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">Seller Name</div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span className="text-sm text-gray-300">
                        {mockSellerRating} ({mockSellerReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Member Since</div>
                    <div className="text-white">2023</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response Time</div>
                    <div className="text-white">&lt; 1 hour</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Total Sales</div>
                    <div className="text-white">547</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Completion Rate</div>
                    <div className="text-green-400">99.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Safety Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Shield className="text-green-400 mt-0.5" size={14} />
                    <span>Your payment is protected by our escrow system</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Clock className="text-blue-400 mt-0.5" size={14} />
                    <span>Funds are released only after you confirm receipt</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <MessageCircle className="text-purple-400 mt-0.5" size={14} />
                    <span>Keep all communication within Kalluba</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}