
import React from "react";
import { getToolsData } from "@/data/toolsData";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";
import { HomeToolsHeader } from "./tools/HomeToolsHeader";
import { FeaturedToolsList } from "./tools/FeaturedToolsList";
import { EaDownloadForm } from "./tools/EaDownloadForm";
import { ArrowRight } from "lucide-react";

const ToolsSection = () => {
  const allTools = getToolsData();
  const featuredTools = allTools.slice(0, 4); // Just show the first 4 tools
  const expertAdvisors = allTools.filter(tool => tool.category === "Expert Advisors");
  const { isDialogOpen, closeDialog } = useDownloadInfo();
  
  // Platform badge colors
  const platformBadgeColors = {
    "MT4": "bg-[#0EA5E9]/20 text-[#0EA5E9]",
    "MT5": "bg-[#8B5CF6]/20 text-[#8B5CF6]",
    "Both": "bg-gray-500/20 text-gray-300"
  };

  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Dialog component */}
        <DownloadInfoDialog isOpen={isDialogOpen} onClose={closeDialog} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <HomeToolsHeader />
            
            <FeaturedToolsList 
              tools={featuredTools} 
              platformBadgeColors={platformBadgeColors} 
            />
          </div>
          
          <EaDownloadForm expertAdvisors={expertAdvisors} />
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
