import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gem, Shield, Coins, Clock, Star, Users, TrendingUp, Globe } from "lucide-react";

export default function Landing() {
  useEffect(() => {
    document.title = "Kalluba - Digital Assets Marketplace | Secure Trading Platform";
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-kalluba-navy text-white">
      {/* Header */}
      <header className="bg-kalluba-dark border-b border-kalluba-darker sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-kalluba-gold to-kalluba-blue rounded-lg flex items-center justify-center">
                <Gem className="text-kalluba-navy text-sm" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">Kalluba</span>
            </div>
            
            <Button onClick={handleLogin} className="bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for accounts, subscriptions, gift cards and more..." 
                className="w-full px-6 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-kalluba-gold focus:border-transparent"
                disabled
              />
              <Button 
                onClick={handleLogin}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400"
              >
                Sign In to Search
              </Button>
            </div>
          </div>

          {/* Category Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Accounts", desc: "Premium gaming & social accounts" },
              { icon: Star, title: "Subscriptions", desc: "Netflix, Spotify, Premium services" },
              { icon: Gem, title: "Gift Cards", desc: "Amazon, Steam, iTunes & more" },
              { icon: Clock, title: "Software", desc: "Licenses, tools & digital assets" }
            ].map((category, index) => (
              <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-20 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <category.icon className="text-xl text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-white">{category.title}</h3>
                  <p className="text-sm text-gray-300">{category.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-kalluba-dark border-t border-kalluba-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between space-y-4 md:space-y-0">
            {[
              { icon: Shield, value: "2,847,321", label: "TRUSTED USERS", color: "text-kalluba-gold" },
              { icon: TrendingUp, value: "$47.2M+", label: "COMPLETED TRANSACTIONS", color: "text-green-400" },
              { icon: Clock, value: "12 MIN", label: "AVERAGE DELIVERY", color: "text-kalluba-blue" },
              { icon: Star, value: "4.9/5", label: "CUSTOMER RATING", color: "text-purple-400" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-kalluba-gold to-yellow-400 rounded-full flex items-center justify-center">
                  <stat.icon className="text-kalluba-navy text-lg" size={20} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-kalluba-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient-gold">Kalluba</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the most secure and trusted digital marketplace with advanced features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Protected Transactions",
                desc: "Your money is held in escrow until you confirm receipt"
              },
              {
                icon: Coins,
                title: "Multiple Payment Methods",
                desc: "Credit cards, PayPal, crypto, and local payment options"
              },
              {
                icon: Clock,
                title: "Instant Delivery",
                desc: "Most digital assets delivered within minutes"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gradient-card border border-kalluba-darker">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-kalluba-gold to-yellow-400 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="text-kalluba-navy text-2xl" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={handleLogin}
              size="lg"
              className="bg-gradient-to-r from-kalluba-gold to-yellow-400 text-kalluba-navy px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-kalluba-gold/25 transition-all"
            >
              Start Trading Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-kalluba-dark border-t border-kalluba-darker py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-kalluba-gold to-kalluba-blue rounded-lg flex items-center justify-center">
                <Gem className="text-kalluba-navy text-sm" />
              </div>
              <span className="text-xl font-bold text-gradient-gold">Kalluba</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The world's leading marketplace for digital assets, premium accounts, and exclusive subscriptions.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-400" size={16} />
                <span className="text-gray-400 text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="text-green-400" size={16} />
                <span className="text-gray-400 text-sm">256-bit Encryption</span>
              </div>
            </div>
            <div className="border-t border-kalluba-darker pt-8 mt-8">
              <p className="text-gray-400 text-sm">
                © 2024 Kalluba. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
