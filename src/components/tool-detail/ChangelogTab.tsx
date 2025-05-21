
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/data/toolsData";

interface ChangelogTabProps {
  tool: Tool;
}

export default function ChangelogTab({ tool }: ChangelogTabProps) {
  return (
    <>
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
    </>
  );
}
