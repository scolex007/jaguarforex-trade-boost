
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getToolsData } from "@/data/toolsData";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";
import { ToolsHeader } from "@/components/tools/ToolsHeader";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { ToolsGrid } from "@/components/tools/ToolsGrid";

const Tools = () => {
  const categories = ["All", "Expert Advisors", "Indicators", "Scripts", "Utilities"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePlatform, setActivePlatform] = useState("All");
  const { isAuthenticated } = useAuth();
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

  // Reset filters function
  const resetFilters = () => {
    setActiveCategory("All");
    setActivePlatform("All");
  };

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Dialog component */}
            <DownloadInfoDialog isOpen={isDialogOpen} onClose={closeDialog} />
            
            <ToolsHeader />
            
            <ToolFilters
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activePlatform={activePlatform}
              setActivePlatform={setActivePlatform}
            />
            
            <ToolsGrid
              filteredTools={filteredTools}
              platformBadgeColors={platformBadgeColors}
              popularBadgeColors={popularBadgeColors}
              newBadgeColor={newBadgeColor}
              getRandomColor={getRandomColor}
              resetFilters={resetFilters}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tools;
