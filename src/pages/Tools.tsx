
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, BarChart3, LineChart, Gauge, Filter, Calculator, ChartCandlestick, FileChartLine, FileChartColumn, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { truncateText } from "@/lib/utils";
import { getToolsData } from "@/data/toolsData";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";

const Tools = () => {
  const categories = ["All", "Expert Advisors", "Indicators", "Scripts", "Utilities"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePlatform, setActivePlatform] = useState("All");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDialogOpen, handleDownloadClick, closeDialog } = useDownloadInfo();
  
  // Badge color variants for platform badges
  const platformBadgeColors = {
    "MT4": "bg-[#0EA5E9]/20 text-[#0EA5E9]",
    "MT5": "bg-[#8B5CF6]/20 text-[#8B5CF6]",
    "Both": "bg-gray-500/20 text-gray-300"
  };
  
  // Different badge colors for Popular badge
  const popularBadgeColors = [
    "bg-[#F97316]/20 text-[#F97316]", // Orange
    "bg-[#10B981]/20 text-[#10B981]", // Green
    "bg-[#EC4899]/20 text-[#EC4899]", // Pink
    "bg-[#F43F5E]/20 text-[#F43F5E]", // Red
  ];

  // New badge color for "New" tag
  const newBadgeColor = "bg-[#0EA5E9]/20 text-[#0EA5E9]";
  
  const tools = getToolsData();
  
  const filteredTools = tools.filter(tool => {
    // Filter by category
    const categoryMatch = activeCategory === "All" || tool.category === activeCategory;
    
    // Filter by platform
    const platformMatch = 
      activePlatform === "All" || 
      tool.platform === activePlatform || 
      tool.platform === "Both";
    
    return categoryMatch && platformMatch;
  });

  // Helper function to get a random color from the array
  const getRandomColor = (colors: string[]) => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Dialog component */}
            <DownloadInfoDialog isOpen={isDialogOpen} onClose={closeDialog} />
            
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                JaguarForex <span className="gradient-text">Trading Tools</span>
              </h1>
              <p className="text-gray-300 md:text-lg max-w-3xl mx-auto">
                Access our library of professional trading tools to enhance your trading strategy,
                improve your analysis, and boost your profitability.
              </p>
            </div>
            
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
            
            {/* Tools Grid - Responsive: 1 column on mobile, 2-3 columns on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card key={index} className="bg-jaguarblue-700 border border-jaguarblue-600 hover:border-jaguargold/50 transition-all flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-jaguarblue-800 rounded-lg text-jaguargold">
                        {tool.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        {tool.popular && (
                          <Badge className={getRandomColor(popularBadgeColors)}>
                            Popular
                          </Badge>
                        )}
                        {tool.isNew && (
                          <Badge className={newBadgeColor}>
                            New
                          </Badge>
                        )}
                        <Badge className={platformBadgeColors[tool.platform]}>
                          {tool.platform}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-white">{tool.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {truncateText(tool.description, 80)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>{tool.category}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto flex justify-between items-center gap-2">
                    <Button 
                      className="flex-1 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center justify-center gap-2"
                      asChild
                    >
                      <Link to={`/tools/${tool.id}`}>
                        View Tool <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-jaguarblue-600 hover:bg-jaguarblue-500 text-white"
                      onClick={handleDownloadClick}
                      title={isAuthenticated ? "Quick download" : "Login to download"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-300 text-lg">No tools found matching the selected filters.</p>
                <Button 
                  className="mt-4 bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
                  onClick={() => {
                    setActiveCategory("All");
                    setActivePlatform("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
