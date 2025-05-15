
import { Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = 'rating' | 'name';
export type SortDirection = 'asc' | 'desc';

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortByChange: (option: SortOption) => void;
  onSortDirectionToggle: () => void;
}

const SortControls = ({ 
  sortBy, 
  sortDirection, 
  onSortByChange, 
  onSortDirectionToggle 
}: SortControlsProps) => {
  return (
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
            onClick={() => onSortByChange('rating')}
          >
            Rating
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`${sortBy === 'name' ? 'bg-jaguarblue-600' : ''}`}
            onClick={() => onSortByChange('name')}
          >
            Broker Name
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button 
        variant="outline" 
        onClick={onSortDirectionToggle}
        className="border-jaguarblue-600"
      >
        {sortDirection === 'desc' ? 
          <ArrowDown className="mr-2" /> : 
          <ArrowUp className="mr-2" />
        }
        {sortDirection === 'desc' ? 'Desc' : 'Asc'}
      </Button>
    </div>
  );
};

export default SortControls;
