
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Broker } from "@/data/brokersData";
import BrokerCard from "./BrokerCard";
import { SortOption, SortDirection } from "./SortControls";

interface BrokersListProps {
  brokers: Broker[];
  searchQuery: string;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onClearSearch: () => void;
}

const BrokersList = ({ 
  brokers, 
  searchQuery, 
  sortBy, 
  sortDirection, 
  onClearSearch 
}: BrokersListProps) => {
  
  // Filter and sort brokers
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

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredBrokers.length} {filteredBrokers.length === 1 ? 'broker' : 'brokers'}
      </div>
      
      {filteredBrokers.length === 0 ? (
        <div className="text-center py-12 bg-jaguarblue-700 rounded-lg border border-jaguarblue-600">
          <p className="text-xl text-gray-300">No brokers match your search criteria</p>
          <Button 
            variant="link" 
            className="text-jaguargold mt-2"
            onClick={onClearSearch}
          >
            Clear search
          </Button>
        </div>
      ) : (
        filteredBrokers.map((broker) => (
          <BrokerCard key={broker.id} broker={broker} />
        ))
      )}
    </div>
  );
};

export default BrokersList;
