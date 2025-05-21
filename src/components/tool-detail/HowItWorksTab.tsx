
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tool } from "@/data/toolsData";

interface HowItWorksTabProps {
  tool: Tool;
}

export default function HowItWorksTab({ tool }: HowItWorksTabProps) {
  return (
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
        {tool.category === "Expert Advisors" ? (
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/kiWxR-8xTEU?si=oszo0LrHO9K-1iLV" 
              title={`How ${tool.name} Works`}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg border border-jaguarblue-600"
            ></iframe>
          </div>
        ) : (
          <AspectRatio ratio={16/9} className="bg-jaguarblue-700 rounded-lg overflow-hidden border border-jaguarblue-600">
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-center p-4">
                [Animation or screenshot of {tool.name} in action would appear here]
              </p>
            </div>
          </AspectRatio>
        )}
      </div>
    </div>
  );
}
