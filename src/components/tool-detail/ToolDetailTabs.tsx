
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tool } from "@/data/toolsData";
import HowItWorksTab from "./HowItWorksTab";
import FeaturesTab from "./FeaturesTab";
import SetupTab from "./SetupTab";
import FaqTab from "./FaqTab";
import ChangelogTab from "./ChangelogTab";

interface ToolDetailTabsProps {
  tool: Tool;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function ToolDetailTabs({ tool, activeTab, setActiveTab }: ToolDetailTabsProps) {
  return (
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
                id="changelog-tab"
                value="changelog" 
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-jaguargold rounded-none bg-transparent data-[state=active]:shadow-none"
              >
                Changelog
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="pb-12">
            <TabsContent value="how-it-works" className="mt-0">
              <HowItWorksTab tool={tool} />
            </TabsContent>
            
            <TabsContent value="features" className="mt-0">
              <FeaturesTab tool={tool} />
            </TabsContent>
            
            <TabsContent value="setup" className="mt-0">
              <SetupTab tool={tool} />
            </TabsContent>
            
            <TabsContent value="faq" className="mt-0">
              <FaqTab tool={tool} />
            </TabsContent>
            
            <TabsContent value="changelog" className="mt-0">
              <ChangelogTab tool={tool} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
