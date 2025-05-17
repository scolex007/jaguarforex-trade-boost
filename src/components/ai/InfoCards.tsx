
import { Check } from 'lucide-react';
import { ModelOption } from '@/services/aiAssistantService';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InfoCardsProps {
  currentModel: ModelOption;
}

const InfoCards = ({ currentModel }: InfoCardsProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-jaguarblue-900 border-jaguarblue-700">
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Current Model: {currentModel.name}</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-xs text-gray-400">{currentModel.description}</p>
          <div className="text-xs text-gray-400 flex items-center mt-1">
            <span>Provider: {currentModel.provider}</span>
            <span className="mx-2">•</span>
            <span>Context: {(currentModel.contextWindow / 1000).toFixed(0)}K tokens</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-jaguarblue-900 border-jaguarblue-700">
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Usage Tips</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <ul className="text-xs text-gray-400 space-y-1">
            <li className="flex items-start">
              <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
              <span>Ask specific, detailed questions</span>
            </li>
            <li className="flex items-start">
              <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
              <span>Include all relevant context</span>
            </li>
            <li className="flex items-start">
              <Check className="h-3 w-3 mr-1 mt-0.5 text-green-500" />
              <span>Try different models for different tasks</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
