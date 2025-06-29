import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Wallet, 
  Plus, 
  ArrowDown, 
  ArrowUp, 
  RefreshCw, 
  CreditCard, 
  Bitcoin, 
  DollarSign,
  TrendingUp,
  Clock,
  Shield
} from "lucide-react";
import type { WalletTransaction } from "@shared/schema";

export default function WalletPage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    document.title = "My Wallet - Kalluba | Secure Digital Payments";
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
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
  }, [isAuthenticated, toast]);

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["/api/wallet/transactions"],
    staleTime: 60 * 1000,
    enabled: isAuthenticated,
  });

  const depositMutation = useMutation({
    mutationFn: async (data: { amount: string; description: string; paymentMethod: string }) => {
      return await apiRequest("/api/wallet/transactions", {
        method: "POST",
        body: JSON.stringify({
          type: "deposit",
          amount: data.amount,
          description: data.description,
          paymentMethod: data.paymentMethod,
          status: "completed"
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Deposit Successful",
        description: "Your deposit has been processed successfully.",
      });
      setShowDepositDialog(false);
      setDepositAmount("");
      setPaymentMethod("");
      queryClient.invalidateQueries({ queryKey: ["/api/wallet/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
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
        title: "Deposit Failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async (data: { amount: string; description: string; paymentMethod: string }) => {
      return await apiRequest("/api/wallet/transactions", {
        method: "POST",
        body: JSON.stringify({
          type: "withdrawal",
          amount: data.amount,
          description: data.description,
          paymentMethod: data.paymentMethod,
          status: "pending"
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Withdrawal Requested",
        description: "Your withdrawal request has been submitted and is being processed.",
      });
      setShowWithdrawDialog(false);
      setWithdrawAmount("");
      setPaymentMethod("");
      queryClient.invalidateQueries({ queryKey: ["/api/wallet/transactions"] });
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
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeposit = () => {
    if (!depositAmount || !paymentMethod) {
      toast({
        title: "Invalid Input",
        description: "Please enter an amount and select a payment method.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    depositMutation.mutate({
      amount: depositAmount,
      description: `Deposit via ${paymentMethod}`,
      paymentMethod: paymentMethod
    });
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !paymentMethod) {
      toast({
        title: "Invalid Input",
        description: "Please enter an amount and select a payment method.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawAmount);
    const balance = parseFloat(user?.walletBalance || "0");
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    withdrawMutation.mutate({
      amount: withdrawAmount,
      description: `Withdrawal to ${paymentMethod}`,
      paymentMethod: paymentMethod
    });
  };

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

  const getPaymentMethodIcon = (method: string) => {
    const lower = method?.toLowerCase() || "";
    if (lower.includes("crypto") || lower.includes("bitcoin")) return Bitcoin;
    if (lower.includes("card") || lower.includes("credit")) return CreditCard;
    return DollarSign;
  };

  // Calculate stats
  const totalDeposits = transactions?.filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;
  
  const totalWithdrawals = transactions?.filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;

  const escrowBalance = "156.00"; // Mock escrow balance
  const activeOrders = 2; // Mock active orders

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-kalluba-navy text-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Wallet</h1>
          <p className="text-gray-400">Manage your funds, deposits, and withdrawals securely</p>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border border-kalluba-darker">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Available Balance</p>
                  <p className="text-3xl font-bold text-kalluba-gold">
                    ${user?.walletBalance || "0.00"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-kalluba-gold rounded-lg flex items-center justify-center">
                  <Wallet className="text-kalluba-navy" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border border-kalluba-darker">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Escrow</p>
                  <p className="text-2xl font-bold text-orange-400">${escrowBalance}</p>
                  <p className="text-gray-400 text-xs">{activeOrders} active orders</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border border-kalluba-darker">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Deposits</p>
                  <p className="text-2xl font-bold text-green-400">${totalDeposits.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border border-kalluba-darker">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Withdrawals</p>
                  <p className="text-2xl font-bold text-red-400">${totalWithdrawals.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <ArrowDown className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400 font-bold">
                      <Plus className="mr-2" size={16} />
                      Deposit Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-kalluba-dark border-kalluba-darker">
                    <DialogHeader>
                      <DialogTitle className="text-white">Deposit Funds</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="bg-kalluba-darker border-kalluba-darker text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Payment Method</label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger className="bg-kalluba-darker border-kalluba-darker text-white">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-kalluba-dark border-kalluba-darker">
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleDeposit}
                        disabled={depositMutation.isPending}
                        className="w-full bg-kalluba-gold text-kalluba-navy hover:bg-yellow-400"
                      >
                        {depositMutation.isPending ? "Processing..." : "Deposit"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full border-kalluba-darker text-white hover:bg-kalluba-darker"
                    >
                      <ArrowDown className="mr-2" size={16} />
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-kalluba-dark border-kalluba-darker">
                    <DialogHeader>
                      <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="bg-kalluba-darker border-kalluba-darker text-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Available: ${user?.walletBalance || "0.00"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Withdrawal Method</label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger className="bg-kalluba-darker border-kalluba-darker text-white">
                            <SelectValue placeholder="Select withdrawal method" />
                          </SelectTrigger>
                          <SelectContent className="bg-kalluba-dark border-kalluba-darker">
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        onClick={handleWithdraw}
                        disabled={withdrawMutation.isPending}
                        className="w-full bg-red-500 text-white hover:bg-red-600"
                      >
                        {withdrawMutation.isPending ? "Processing..." : "Withdraw"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="border-t border-kalluba-darker pt-4">
                  <h4 className="text-white font-semibold mb-3">Security Features</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="text-green-400" size={14} />
                      <span className="text-gray-300">Escrow Protection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-blue-400" size={14} />
                      <span className="text-gray-300">Instant Deposits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="text-purple-400" size={14} />
                      <span className="text-gray-300">Multiple Payment Methods</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border border-kalluba-darker">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-kalluba-darker rounded-lg h-16 animate-pulse" />
                    ))}
                  </div>
                ) : transactions && transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((transaction: WalletTransaction, index: number) => {
                      const Icon = getTransactionIcon(transaction.type);
                      const color = getTransactionColor(transaction.type);
                      const PaymentIcon = getPaymentMethodIcon(transaction.paymentMethod || "");
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-kalluba-darker rounded-lg hover:bg-opacity-80 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 ${color.replace('text-', 'bg-')} rounded-lg flex items-center justify-center`}>
                              <Icon className="text-white" size={18} />
                            </div>
                            <div>
                              <div className="text-white font-medium">{transaction.description}</div>
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <PaymentIcon size={14} />
                                <span>{transaction.paymentMethod}</span>
                                <span>•</span>
                                <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`${color} font-bold`}>
                              {formatTransactionAmount(transaction.amount, transaction.type)}
                            </div>
                            <div className={`text-sm ${
                              transaction.status === 'completed' ? 'text-green-400' : 
                              transaction.status === 'pending' ? 'text-orange-400' : 'text-red-400'
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wallet className="mx-auto text-gray-400 mb-4" size={48} />
                    <div className="text-gray-400 text-lg mb-2">No transactions yet</div>
                    <p className="text-gray-500">Your wallet activity will appear here once you start trading.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}