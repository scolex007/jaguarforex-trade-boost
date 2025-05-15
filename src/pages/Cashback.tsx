
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBrokers } from "@/data/brokersData";
import SearchBar from "@/components/cashback/SearchBar";
import SortControls, { SortOption, SortDirection } from "@/components/cashback/SortControls";
import BrokersList from "@/components/cashback/BrokersList";
import CashbackHeader from "@/components/cashback/CashbackHeader";

const Cashback = () => {
  const brokers = getBrokers();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSortByChange = (option: SortOption) => {
    setSortBy(option);
  };
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "desc" ? "asc" : "desc");
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <CashbackHeader />
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar 
              searchQuery={searchQuery} 
              onSearchChange={handleSearchChange} 
            />
            <SortControls 
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={handleSortByChange}
              onSortDirectionToggle={toggleSortDirection}
            />
          </div>
          
          <BrokersList 
            brokers={brokers}
            searchQuery={searchQuery}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onClearSearch={clearSearch}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cashback;
