
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tool } from "@/data/toolsData";

interface SetupTabProps {
  tool: Tool;
}

export default function SetupTab({ tool }: SetupTabProps) {
  return (
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
        {tool.category === "Expert Advisors" ? (
          <div className="aspect-video mb-4">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/leH9PGkLc6Q?si=WIX8J4qzujUJKiwX" 
              title={`${tool.name} Setup Guide`}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg border border-jaguarblue-600"
            ></iframe>
          </div>
        ) : (
          <AspectRatio ratio={16/9} className="bg-jaguarblue-800 rounded-lg overflow-hidden border border-jaguarblue-600 mb-4">
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-center p-4">
                [Installation video would appear here]
              </p>
            </div>
          </AspectRatio>
        )}
        <p className="text-gray-400 text-sm">
          Follow along with our detailed installation video to set up {tool.name} correctly on your platform.
        </p>
      </div>
    </div>
  );
}
