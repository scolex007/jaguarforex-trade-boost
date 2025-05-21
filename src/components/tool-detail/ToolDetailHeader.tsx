
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Tool } from "@/data/toolsData";

interface ToolDetailHeaderProps {
  tool: Tool;
  handleDownloadClick: () => void;
}

export default function ToolDetailHeader({ tool, handleDownloadClick }: ToolDetailHeaderProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Platform badge colors
  const platformBadgeColors = {
    "MT4": "bg-[#0EA5E9]/20 text-[#0EA5E9]",
    "MT5": "bg-[#8B5CF6]/20 text-[#8B5CF6]",
    "Both": "bg-gray-500/20 text-gray-300"
  };

  // Popular badge color
  const popularBadgeColor = "bg-[#F97316]/20 text-[#F97316]";
  
  // New badge color
  const newBadgeColor = "bg-[#0EA5E9]/20 text-[#0EA5E9]";

  return (
    <section className="pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild className="border-jaguarblue-600">
            <Link to="/tools" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={platformBadgeColors[tool.platform]}>
                {tool.platform}
              </Badge>
              {tool.popular && (
                <Badge className={popularBadgeColor}>
                  Popular
                </Badge>
              )}
              {tool.isNew && (
                <Badge className={newBadgeColor}>
                  New
                </Badge>
              )}
              <Badge variant="outline" className="border-jaguarblue-600">
                v{tool.version}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {tool.name}
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl">
              {tool.shortDescription}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {isAuthenticated ? (
                <Button 
                  onClick={handleDownloadClick} 
                  className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center gap-2"
                >
                  Download v{tool.version} <Download className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center gap-2"
                >
                  Login to Download <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="border-jaguarblue-600"
                onClick={() => {
                  document.getElementById("changelog-tab")?.click();
                  // Scroll to tabs section
                  document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Changelog
              </Button>
            </div>
          </div>

          <ToolInfoSidebar tool={tool} handleDownloadClick={handleDownloadClick} />
        </div>
      </div>
    </section>
  );
}

function ToolInfoSidebar({ tool, handleDownloadClick }: ToolDetailHeaderProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-jaguarblue-700 p-6 rounded-xl border border-jaguarblue-600 max-w-md w-full">
      <div className="p-4 rounded-lg bg-jaguarblue-800/50 mb-4 flex items-center gap-3">
        <div className="p-3 bg-jaguarblue-900 rounded-lg text-jaguargold">
          {tool.icon}
        </div>
        <div>
          <h3 className="font-medium">{tool.name}</h3>
          <p className="text-sm text-gray-400">{tool.category}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Platform</span>
          <span className="text-white font-medium">{tool.platform}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Version</span>
          <span className="text-white font-medium">{tool.version}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Category</span>
          <span className="text-white font-medium">{tool.category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Last Updated</span>
          <span className="text-white font-medium">{tool.changelog[0]?.date || "N/A"}</span>
        </div>
        
        {isAuthenticated ? (
          <Button 
            onClick={handleDownloadClick} 
            className="w-full mt-4 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
          >
            Download Now
          </Button>
        ) : (
          <Button 
            asChild
            className="w-full mt-4"
          >
            <Link to="/login">Login to Download</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
