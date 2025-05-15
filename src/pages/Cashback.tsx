
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { getBrokers, Broker } from "@/data/brokersData";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = 'rating' | 'name';
type SortDirection = 'asc' | 'desc';

const Cashback = () => {
  const brokers = getBrokers();
  const navigate = useNavigate();
  const [expandedDetails, setExpandedDetails] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  const toggleDetails = (brokerId: string) => {
    setExpandedDetails(prev => ({
      ...prev,
      [brokerId]: !prev[brokerId]
    }));
  };
  
  const handleGetCashback = (brokerId: string) => {
    console.log("Navigating to registration with broker ID:", brokerId);
    
    // Make sure we have a valid broker ID
    if (brokerId) {
      // Navigate directly to the registration page with the broker ID
      navigate(`/cashback/register?broker=${brokerId}`);
    }
  };

  // Search and sort logic
  const filteredBrokers = useMemo(() => {
    let result = [...brokers];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(broker => 
        broker.name.toLowerCase().includes(query) || 
        broker.platforms.some(p => p.toLowerCase().includes(query)) ||
        broker.accountTypes.some(at => at.name.toLowerCase().includes(query))
      );
    }
    
    // Sort
    result.sort((a, b) => {
      if (sortBy === "rating") {
        return sortDirection === "desc" 
          ? b.rating - a.rating 
          : a.rating - b.rating;
      } else {
        return sortDirection === "desc" 
          ? b.name.localeCompare(a.name) 
          : a.name.localeCompare(b.name);
      }
    });
    
    return result;
  }, [brokers, searchQuery, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "desc" ? "asc" : "desc");
  };

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">JaguarForex Cashback</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Get $2 back on every standard lot you trade.
              Register your MT4/MT5 account once, earn rebates forever.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search brokers, platforms, account types..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-jaguarblue-700 border-jaguarblue-600 text-white"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-jaguarblue-600">
                    <Filter className="mr-2" />
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-jaguarblue-700 border-jaguarblue-600">
                  <DropdownMenuItem 
                    className={`${sortBy === 'rating' ? 'bg-jaguarblue-600' : ''}`}
                    onClick={() => setSortBy('rating')}
                  >
                    Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className={`${sortBy === 'name' ? 'bg-jaguarblue-600' : ''}`}
                    onClick={() => setSortBy('name')}
                  >
                    Broker Name
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="outline" 
                onClick={toggleSortDirection}
                className="border-jaguarblue-600"
              >
                {sortDirection === 'desc' ? 
                  <ArrowDown className="mr-2" /> : 
                  <ArrowUp className="mr-2" />
                }
                {sortDirection === 'desc' ? 'Desc' : 'Asc'}
              </Button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-4 text-sm text-gray-400">
            Showing {filteredBrokers.length} {filteredBrokers.length === 1 ? 'broker' : 'brokers'}
          </div>
          
          {/* Brokers List */}
          <div className="space-y-6">
            {filteredBrokers.length === 0 ? (
              <div className="text-center py-12 bg-jaguarblue-700 rounded-lg border border-jaguarblue-600">
                <p className="text-xl text-gray-300">No brokers match your search criteria</p>
                <Button 
                  variant="link" 
                  className="text-jaguargold mt-2"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            ) : (
              filteredBrokers.map((broker) => (
                <div 
                  key={broker.id}
                  className="bg-jaguarblue-700 rounded-lg border border-jaguarblue-600 overflow-hidden shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    {/* Broker Logo and Rating */}
                    <div className="p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-jaguarblue-600">
                      <div className="bg-white p-3 rounded-lg mb-4 w-32 h-32 flex items-center justify-center">
                        <img 
                          src={broker.logo} 
                          alt={`${broker.name} logo`} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-jaguargold font-bold text-lg mr-2">{broker.rating.toFixed(1)}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(broker.rating) ? 'text-jaguargold' : 'text-gray-400'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      {broker.featured && (
                        <Badge className="bg-jaguargold text-jaguarblue-900 mt-2">Featured Broker</Badge>
                      )}
                    </div>
                    
                    {/* Account Types and Details */}
                    <div className="p-6 md:col-span-2 border-b md:border-b-0 md:border-r border-jaguarblue-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">{broker.name}</h3>
                        <Button 
                          variant="link" 
                          className="text-jaguargold p-0"
                          onClick={() => toggleDetails(broker.id)}
                        >
                          {expandedDetails[broker.id] ? "Hide Details" : "Details"}
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {broker.accountTypes.map((account, index) => (
                          <div key={index} className="bg-jaguarblue-800/50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">{account.name}</h4>
                            {Array.isArray(account.description) ? (
                              <ul className="text-gray-300 text-sm space-y-1">
                                {account.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-300 text-sm">{account.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {expandedDetails[broker.id] && (
                        <div className="mt-4 pt-4 border-t border-jaguarblue-600">
                          <h4 className="text-sm font-medium mb-2">Trading Platforms</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {broker.platforms.map((platform, index) => (
                              <Badge key={index} variant="secondary" className="bg-jaguarblue-600">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">
                            *Terms and conditions apply. See broker website for full details.
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Payment Options and CTA */}
                    <div className="p-6 flex flex-col">
                      <h4 className="text-sm font-medium mb-3">Payment Options</h4>
                      <ul className="space-y-2 mb-auto">
                        {broker.paymentOptions.map((option, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-jaguargold mr-2" />
                            <span className="text-gray-300">{option}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        className="mt-4 w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                        onClick={() => handleGetCashback(broker.id)}
                      >
                        Get Cashback
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cashback;
