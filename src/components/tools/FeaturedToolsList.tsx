
import React from "react";
import { Tool } from "@/data/toolsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedToolsListProps {
  tools: Tool[];
  platformBadgeColors: Record<string, string>;
}

export function FeaturedToolsList({ tools, platformBadgeColors }: FeaturedToolsListProps) {
  return (
    <>
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-jaguarblue-800/50 border border-jaguarblue-700">
            <div className="mt-1 p-2 bg-jaguarblue-700 rounded-lg text-jaguargold">
              {tool.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">{tool.name}</h3>
                <Badge className={platformBadgeColors[tool.platform]}>
                  {tool.platform}
                </Badge>
              </div>
              <p className="text-gray-300 text-sm">{tool.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <Button className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 flex items-center gap-2" asChild>
          <Link to="/tools">
            Browse All Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
