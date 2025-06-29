import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, BarChart3, MessageCircle, CheckCircle, Gamepad2, Tv } from "lucide-react";

export default function SellerDashboardPreview() {
  const { user } = useAuth();
  
  const { data: orders } = useQuery({
    queryKey: ["/api/orders"],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const { data: sellerListings } = useQuery({
    queryKey: ["/api/listings/seller", user?.id],
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

  const handleCreateListing = () => {
    console.log("Create listing clicked");
    // TODO: Navigate to create listing form
  };

  const handleViewAnalytics = () => {
    console.log("View analytics clicked");
    // TODO: Navigate to analytics page
  };

  const handleCheckMessages = () => {
    console.log("Check messages clicked");
    // TODO: Navigate to messages page
  };

  const sellerStats = {
    totalSales: user?.totalSales || "0.00",
    activeListings: sellerListings?.length || 0,
    rating: user?.sellerRating || "0.0",
    completedOrders: user?.completedOrders || 0
  };

  const quickActions = [
    {
      icon: Plus,
      label: "Create New Listing",
      onClick: handleCreateListing,
      primary: true
    },
    {
      icon: BarChart3,
      label: "View Analytics",
      onClick: handleViewAnalytics,
      primary: false
    },
    {
      icon: MessageCircle,
      label: "Check Messages",
      onClick: handleCheckMessages,
      primary: false
    }
  ];

  const sellerBenefits = [
    "Zero listing fees",
    "Instant payouts",
    "24/7 seller support",
    "Dispute protection"
  ];

  // Filter recent seller orders
  const recentSellerOrders = orders?.filter(order => order.sellerId === user?.id).slice(0, 2) || [];

  return (
    <section className="py-16 bg-kalluba-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Selling Your 
            <span className="text-gradient-gold"> Digital Assets</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of sellers making money from their premium accounts, subscriptions, and digital assets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seller Stats */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Seller Dashboard</h3>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-kalluba-darker rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-kalluba-gold">
                      ${parseFloat(sellerStats.totalSales).toFixed(0)}
                    </div>
                    <div className="text-gray-400 text-sm">Total Sales</div>
                  </div>
                  <div className="bg-kalluba-darker rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {sellerStats.activeListings}
                    </div>
                    <div className="text-gray-400 text-sm">Active Listings</div>
                  </div>
                  <div className="bg-kalluba-darker rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {parseFloat(sellerStats.rating).toFixed(1)}
                    </div>
                    <div className="text-gray-400 text-sm">Rating</div>
                  </div>
                  <div className="bg-kalluba-darker rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {sellerStats.completedOrders}
                    </div>
                    <div className="text-gray-400 text-sm">Completed</div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h4 className="font-semibold text-white mb-4">Recent Orders</h4>
                  <div className="space-y-3">
                    {recentSellerOrders.length > 0 ? (
                      recentSellerOrders.map((order, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-kalluba-darker rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Gamepad2 className="text-white" size={20} />
                            </div>
                            <div>
                              <div className="text-white font-medium">Order #{order.id}</div>
                              <div className="text-gray-400 text-sm">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-kalluba-gold font-bold">
                              ${parseFloat(order.amount).toFixed(2)}
                            </div>
                            <div className={`text-sm ${
                              order.status === 'completed' ? 'text-green-400' : 
                              order.status === 'pending' ? 'text-orange-400' : 'text-red-400'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-center py-8">
                        No recent orders to display
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.onClick}
                      className={`w-full py-3 font-medium transition-colors ${
                        action.primary 
                          ? "bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400"
                          : "bg-kalluba-darker text-white hover:bg-gray-600"
                      }`}
                    >
                      <action.icon className="mr-2" size={16} />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-4">Seller Benefits</h4>
                <div className="space-y-3 text-sm">
                  {sellerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-green-400" size={16} />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
