
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getToolsData } from "@/data/toolsData";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";

const ToolsSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const allTools = getToolsData();
  const featuredTools = allTools.slice(0, 4); // Just show the first 4 tools
  
  const [selectedEA, setSelectedEA] = useState("JaguarTrend Pro EA");
  const [selectedPlatform, setSelectedPlatform] = useState("MetaTrader 4");
  const { isDialogOpen, handleDownloadClick, closeDialog } = useDownloadInfo();
  
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Premium Trading Tools <span className="gradient-text">For Free</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Access our collection of professional trading tools, expert advisors and indicators without any cost. Designed by professional traders to help you succeed in the forex market.
            </p>
            
            <div className="space-y-4">
              {featuredTools.map((tool, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-jaguarblue-800/50 border border-jaguarblue-700">
                  <div className="mt-1 p-2 bg-jaguarblue-700 rounded-lg text-jaguargold">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white">{tool.name}</h3>
                      <Badge className={platformBadgeColors[tool.platform]}>
                        {tool.platform}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{tool.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center gap-2" asChild>
                <Link to="/tools">
                  Browse All Tools <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-jaguarblue-800 rounded-2xl p-8 border border-jaguarblue-700 shadow-xl animate-glow">
              <h3 className="text-2xl font-bold mb-6 gradient-text">EA Download</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select EA Type</label>
                <select 
                  className="w-full p-3 rounded-lg bg-jaguarblue-700 border border-jaguarblue-600 text-white"
                  value={selectedEA}
                  onChange={(e) => setSelectedEA(e.target.value)}
                >
                  {allTools
                    .filter(tool => tool.category === "Expert Advisors")
                    .map((ea, index) => (
                      <option key={index} value={ea.name}>{ea.name}</option>
                    ))
                  }
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Platform Version</label>
                <select 
                  className="w-full p-3 rounded-lg bg-jaguarblue-700 border border-jaguarblue-600 text-white"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                  <option>MetaTrader 4</option>
                  <option>MetaTrader 5</option>
                </select>
              </div>
              
              <Button 
                className="w-full bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center justify-center gap-2"
                onClick={handleDownloadClick}
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? (
                  <>Download Now <Download className="h-4 w-4" /></>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 w-full justify-center">
                    Login to Download <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Button>
              
              <p className="mt-4 text-center text-xs text-gray-400">
                By downloading, you agree to our terms and conditions
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-jaguargold/10 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
