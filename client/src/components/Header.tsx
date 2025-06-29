import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gem, Wallet, Bell, Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";

export default function Header() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="bg-kalluba-dark border-b border-kalluba-darker sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-kalluba-gold to-kalluba-blue rounded-lg flex items-center justify-center">
                <Gem className="text-kalluba-navy text-sm" size={16} />
              </div>
              <span className="text-xl font-bold text-gradient-gold">Kalluba</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/listings" className="text-gray-300 hover:text-kalluba-gold transition-colors">Browse</a>
            <a href="#" className="text-gray-300 hover:text-kalluba-gold transition-colors">Sell</a>
            <a href="#" className="text-gray-300 hover:text-kalluba-gold transition-colors">Support</a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Wallet Balance */}
            <a href="/wallet" className="hidden sm:flex items-center space-x-2 bg-kalluba-darker px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Wallet className="text-kalluba-gold text-sm" size={16} />
              <span className="text-sm font-medium">${user?.walletBalance || "0.00"}</span>
            </a>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2 text-gray-400 hover:text-kalluba-gold">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl || ""} alt="Profile" />
                    <AvatarFallback className="bg-kalluba-gold text-kalluba-navy text-sm">
                      {user?.firstName?.[0] || user?.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="text-gray-400" size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-kalluba-dark border-kalluba-darker">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-kalluba-darker">
                  <User className="mr-2" size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-kalluba-darker">
                  <Wallet className="mr-2" size={16} />
                  <span>Wallet</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-kalluba-darker">
                  <Settings className="mr-2" size={16} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-kalluba-darker" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-kalluba-darker"
                >
                  <LogOut className="mr-2" size={16} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
