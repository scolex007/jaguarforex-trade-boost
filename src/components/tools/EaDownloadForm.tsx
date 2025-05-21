
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";
import { Tool } from "@/data/toolsData";

interface EaDownloadFormProps {
  expertAdvisors: Tool[];
}

export function EaDownloadForm({ expertAdvisors }: EaDownloadFormProps) {
  const [selectedEA, setSelectedEA] = useState(expertAdvisors[0]?.name || "");
  const [selectedPlatform, setSelectedPlatform] = useState("MetaTrader 4");
  const { isAuthenticated } = useAuth();
  const { handleDownloadClick } = useDownloadInfo();
  
  return (
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
            {expertAdvisors.map((ea, index) => (
              <option key={index} value={ea.name}>{ea.name}</option>
            ))}
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
  );
}
