
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ToolFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activePlatform: string;
  setActivePlatform: (platform: string) => void;
}

export function ToolFilters({
  categories,
  activeCategory,
  setActiveCategory,
  activePlatform,
  setActivePlatform
}: ToolFiltersProps) {
  return (
    <>
      {/* Platform Tabs */}
      <div className="mb-8 flex justify-center">
        <Tabs 
          defaultValue="All" 
          value={activePlatform} 
          onValueChange={setActivePlatform}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-3 bg-jaguarblue-700">
            <TabsTrigger 
              value="All" 
              className="data-[state=active]:bg-jaguargold data-[state=active]:text-jaguarblue-900"
            >
              All Platforms
            </TabsTrigger>
            <TabsTrigger 
              value="MT4" 
              className="data-[state=active]:bg-jaguargold data-[state=active]:text-jaguarblue-900"
            >
              MT4
            </TabsTrigger>
            <TabsTrigger 
              value="MT5" 
              className="data-[state=active]:bg-jaguargold data-[state=active]:text-jaguarblue-900"
            >
              MT5
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={activeCategory === category 
              ? "bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90" 
              : "border-jaguarblue-600 hover:bg-jaguarblue-700"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </>
  );
}
