import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getToolById } from "@/data/toolsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import DownloadInfoDialog from "@/components/DownloadInfoDialog";
import { useDownloadInfo } from "@/hooks/useDownloadInfo";

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = getToolById(toolId || "");
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("how-it-works");
  const navigate = useNavigate();
  const { isDialogOpen, handleDownloadClick, closeDialog } = useDownloadInfo();

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

  if (!tool) {
    return (
      <div className="min-h-screen bg-jaguarblue-800">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Tool Not Found</h1>
          <p className="text-gray-300 mb-8">The tool you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Link>
          </Button>
        </div>
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
                      setActiveTab("changelog");
                      // Scroll to tabs section
                      document.getElementById("tabs-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View Changelog
                  </Button>
                </div>
              </div>

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
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section id="tabs-section" className="py-8">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="how-it-works" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <div className="border-b border-jaguarblue-700 mb-6 overflow-x-auto">
                <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
                  <TabsTrigger 
                    value="how-it-works" 
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
                  >
                    How It Works
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger 
                    value="setup" 
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
                  >
                    Setup
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faq" 
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
                  >
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger 
                    value="changelog" 
                    className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
                  >
                    Changelog
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="pb-12">
                <TabsContent value="how-it-works" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">How {tool.name} Works</h2>
                      <p className="text-gray-300 mb-6">{tool.description}</p>
                      <div className="space-y-3">
                        <p className="text-gray-300">
                          The {tool.name} is designed to help traders {tool.category === "Expert Advisors" ? "automate their trading strategies" : "improve their market analysis"} 
                          with sophisticated algorithms and user-friendly controls.
                        </p>
                      </div>
                    </div>
                    <div>
                      <AspectRatio ratio={16/9} className="bg-jaguarblue-700 rounded-lg overflow-hidden border border-jaguarblue-600">
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <p className="text-center p-4">
                            [Animation or screenshot of {tool.name} in action would appear here]
                          </p>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <ul className="space-y-4">
                        {tool.features.slice(0, Math.ceil(tool.features.length / 2)).map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 h-5 w-5 rounded-full bg-jaguargold/20 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-jaguargold"></div>
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-4">
                        {tool.features.slice(Math.ceil(tool.features.length / 2)).map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 h-5 w-5 rounded-full bg-jaguargold/20 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-jaguargold"></div>
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="setup" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Installation & Setup</h2>
                      <ol className="space-y-4">
                        {tool.installation.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 h-5 w-5 rounded-full bg-jaguargold/20 text-jaguargold flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-gray-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                      
                      <h3 className="text-xl font-bold mt-8 mb-4">Recommended Settings</h3>
                      <ul className="space-y-3">
                        {tool.settings.map((setting, index) => (
                          <li key={index} className="text-gray-300 flex items-start gap-3">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-jaguargold"></div>
                            <span>{setting}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-jaguarblue-700 p-6 rounded-xl border border-jaguarblue-600">
                      <h3 className="text-xl font-bold mb-4">Setup Video</h3>
                      <AspectRatio ratio={16/9} className="bg-jaguarblue-800 rounded-lg overflow-hidden border border-jaguarblue-600 mb-4">
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <p className="text-center p-4">
                            [Installation video would appear here]
                          </p>
                        </div>
                      </AspectRatio>
                      <p className="text-gray-400 text-sm">
                        Follow along with our detailed installation video to set up {tool.name} correctly on your platform.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                  <div className="max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                      {tool.faq.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-jaguarblue-600">
                          <AccordionTrigger className="text-left text-white hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
                
                <TabsContent value="changelog" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Version History</h2>
                  <div className="space-y-8">
                    {tool.changelog.map((release, index) => (
                      <div key={index} className="border-l-2 border-jaguarblue-600 pl-6 pb-2 relative">
                        <div className="absolute w-3 h-3 bg-jaguargold rounded-full -left-[7px] top-2"></div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          Version {release.version}
                          {index === 0 && <Badge className="bg-jaguargold/20 text-jaguargold">Latest</Badge>}
                        </h3>
                        <p className="text-gray-400 mb-3">{release.date}</p>
                        <ul className="space-y-2">
                          {release.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="text-gray-300 flex items-start gap-3">
                              <div className="mt-1.5 h-1 w-1 rounded-full bg-jaguargold"></div>
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetail;
