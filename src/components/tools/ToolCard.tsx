
import { useDownloadInfo } from "@/hooks/useDownloadInfo";
import { Tool } from "@/data/toolsData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { truncateText } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  platformBadgeColors: Record<string, string>;
  popularBadgeColors: string[];
  newBadgeColor: string;
  getRandomColor: (colors: string[]) => string;
}

export function ToolCard({
  tool,
  platformBadgeColors,
  popularBadgeColors,
  newBadgeColor,
  getRandomColor
}: ToolCardProps) {
  const { handleDownloadClick } = useDownloadInfo();
  
  return (
    <Card className="bg-jaguarblue-700 border border-jaguarblue-600 hover:border-jaguargold/50 transition-all flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="p-3 bg-jaguarblue-800 rounded-lg text-jaguargold">
            {tool.icon}
          </div>
          <div className="flex items-center gap-2">
            {tool.popular && (
              <Badge className={getRandomColor(popularBadgeColors)}>
                Popular
              </Badge>
            )}
            {tool.isNew && (
              <Badge className={newBadgeColor}>
                New
              </Badge>
            )}
            <Badge className={platformBadgeColors[tool.platform]}>
              {tool.platform}
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-3 text-white">{tool.name}</CardTitle>
        <CardDescription className="text-gray-300">
          {truncateText(tool.description, 80)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Filter className="mr-2 h-4 w-4" />
          <span>{tool.category}</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between items-center gap-2">
        <Button 
          className="flex-1 bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center justify-center gap-2"
          asChild
        >
          <Link to={`/tools/${tool.id}`}>
            View Tool <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-jaguarblue-600 hover:bg-jaguarblue-500 text-white"
          onClick={handleDownloadClick}
          title="Quick download"
        >
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
