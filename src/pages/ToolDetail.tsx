
import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getToolById } from "@/data/toolsData";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";
import ToolDetailHeader from "@/components/tool-detail/ToolDetailHeader";
import ToolDetailTabs from "@/components/tool-detail/ToolDetailTabs";
import NotFoundSection from "@/components/tool-detail/NotFoundSection";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = getToolById(toolId || "");
  const [activeTab, setActiveTab] = useState("how-it-works");
  const { isDialogOpen, handleDownloadClick, closeDialog } = useDownloadInfo();

  if (!tool) {
    return (
      <div className="min-h-screen bg-jaguarblue-800">
        <Navbar />
        <NotFoundSection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />

      <main>
        {/* Dialog component */}
        <DownloadInfoDialog isOpen={isDialogOpen} onClose={closeDialog} />
        
        {/* Hero Section */}
        <ToolDetailHeader tool={tool} handleDownloadClick={handleDownloadClick} />
        
        {/* Tabs Section */}
        <ToolDetailTabs tool={tool} activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetail;
