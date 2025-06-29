import { useQuery } from "@tanstack/react-query";
import { Shield, Handshake, Clock, Star } from "lucide-react";

export default function TrustIndicators() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const indicators = [
    {
      icon: Shield,
      value: stats?.totalUsers || "0",
      label: "TRUSTED USERS",
      color: "text-kalluba-gold",
      bgGradient: "from-kalluba-gold to-yellow-400"
    },
    {
      icon: Handshake,
      value: stats?.completedTransactions || "$0",
      label: "COMPLETED TRANSACTIONS",
      color: "text-green-400",
      bgGradient: "from-green-500 to-emerald-400"
    },
    {
      icon: Clock,
      value: stats?.avgDeliveryTime || "0 MIN",
      label: "AVERAGE DELIVERY",
      color: "text-kalluba-blue",
      bgGradient: "from-blue-500 to-kalluba-blue"
    },
    {
      icon: Star,
      value: `${stats?.averageRating || "0"}/5`,
      label: "CUSTOMER RATING",
      color: "text-purple-400",
      bgGradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-8 bg-kalluba-dark border-t border-kalluba-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between space-y-4 md:space-y-0">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${indicator.bgGradient} rounded-full flex items-center justify-center`}>
                <indicator.icon className="text-kalluba-navy text-lg" size={20} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${indicator.color}`}>
                  {indicator.value}
                </div>
                <div className="text-sm text-gray-400">{indicator.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
