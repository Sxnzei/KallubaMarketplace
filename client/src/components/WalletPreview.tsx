import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Coins, Clock, Plus, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

export default function WalletPreview() {
  const { user } = useAuth();
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/wallet/transactions"],
    staleTime: 60 * 1000, // 1 minute
  });

  const walletFeatures = [
    {
      icon: Shield,
      title: "Protected Transactions",
      description: "Your money is held in escrow until you confirm receipt",
      color: "bg-green-500"
    },
    {
      icon: Coins,
      title: "Multiple Payment Methods",
      description: "Credit cards, PayPal, crypto, and local payment options",
      color: "bg-kalluba-blue"
    },
    {
      icon: Clock,
      title: "Instant Delivery",
      description: "Most digital assets delivered within minutes",
      color: "bg-kalluba-gold"
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return Plus;
      case 'withdrawal': return ArrowDown;
      case 'purchase': return ArrowDown;
      case 'sale': return ArrowUp;
      default: return RefreshCw;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': 
      case 'sale': 
        return 'text-green-400';
      case 'withdrawal':
      case 'purchase':
        return 'text-red-400';
      default: 
        return 'text-blue-400';
    }
  };

  const formatTransactionAmount = (amount: string, type: string) => {
    const value = parseFloat(amount);
    const prefix = ['deposit', 'sale'].includes(type) ? '+' : '-';
    return `${prefix}$${value.toFixed(2)}`;
  };

  const handleStartTrading = () => {
    console.log("Start trading clicked");
    // TODO: Navigate to marketplace or create listing
  };

  const handleDeposit = () => {
    console.log("Deposit clicked");
    // TODO: Open deposit modal
  };

  // Calculate escrow balance (mock for now)
  const escrowBalance = "156.00";
  const activeOrders = 2;

  return (
    <section className="py-16 bg-kalluba-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Wallet Features */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Secure Trading with 
              <span className="text-gradient-gold"> Smart Escrow</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Trade with confidence using our advanced escrow system and multiple payment options including crypto and traditional methods.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {walletFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 ${feature.color} rounded-lg flex items-center justify-center mt-1`}>
                    <feature.icon className="text-white text-sm" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleStartTrading}
              className="bg-gradient-to-r from-kalluba-gold to-yellow-400 text-kalluba-navy px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-kalluba-gold/25 transition-all"
            >
              Start Trading Now
            </Button>
          </div>

          {/* Wallet Interface Mockup */}
          <Card className="bg-gradient-card border border-kalluba-darker">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">My Wallet</h3>
                <Button 
                  onClick={handleDeposit}
                  className="bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400 text-sm"
                >
                  <Plus className="mr-2" size={16} />
                  Deposit
                </Button>
              </div>

              {/* Balance Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-kalluba-darker rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-2">Total Balance</div>
                  <div className="text-2xl font-bold text-white">
                    ${user?.walletBalance || "0.00"}
                  </div>
                  <div className="text-green-400 text-sm mt-1">
                    <ArrowUp className="inline mr-1" size={12} />
                    +12.5%
                  </div>
                </div>
                <div className="bg-kalluba-darker rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-2">In Escrow</div>
                  <div className="text-2xl font-bold text-orange-400">${escrowBalance}</div>
                  <div className="text-gray-400 text-sm mt-1">{activeOrders} active orders</div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h4 className="font-semibold text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="text-gray-400 text-sm">Loading transactions...</div>
                  ) : transactions && transactions.length > 0 ? (
                    transactions.slice(0, 3).map((transaction, index) => {
                      const Icon = getTransactionIcon(transaction.type);
                      const color = getTransactionColor(transaction.type);
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-kalluba-darker rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${color.replace('text-', 'bg-')} rounded-lg flex items-center justify-center`}>
                              <Icon className="text-white text-sm" size={16} />
                            </div>
                            <div>
                              <div className="text-white font-medium">{transaction.description}</div>
                              <div className="text-gray-400 text-sm">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className={`${color} font-medium`}>
                            {formatTransactionAmount(transaction.amount, transaction.type)}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-sm">No recent transactions</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
