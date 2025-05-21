
import { Tool } from "@/data/toolsData";

interface FeaturesTabProps {
  tool: Tool;
}

export default function FeaturesTab({ tool }: FeaturesTabProps) {
  return (
    <>
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
    </>
  );
}
