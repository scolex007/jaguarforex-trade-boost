
import { Tool } from "@/data/toolsData";
import { Button } from "@/components/ui/button";
import { ToolCard } from "./ToolCard";

interface ToolsGridProps {
  filteredTools: Tool[];
  platformBadgeColors: Record<string, string>;
  popularBadgeColors: string[];
  newBadgeColor: string;
  getRandomColor: (colors: string[]) => string;
  resetFilters: () => void;
}

export function ToolsGrid({
  filteredTools,
  platformBadgeColors,
  popularBadgeColors,
  newBadgeColor,
  getRandomColor,
  resetFilters
}: ToolsGridProps) {
  return (
    <>
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={index}
              tool={tool}
              platformBadgeColors={platformBadgeColors}
              popularBadgeColors={popularBadgeColors}
              newBadgeColor={newBadgeColor}
              getRandomColor={getRandomColor}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-300 text-lg">No tools found matching the selected filters.</p>
          <Button 
            className="mt-4 bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
            onClick={resetFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
}
