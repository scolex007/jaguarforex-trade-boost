
import { Check } from 'lucide-react';
import { ModelOption } from '@/services/aiAssistantService';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableModels: ModelOption[];
}

const ModelSelector = ({ selectedModel, setSelectedModel, availableModels }: ModelSelectorProps) => {
  // Function to handle model selection
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    // Pass selected model to parent component through props
  };

  return (
    <div className="flex items-center">
      <Select
        value={selectedModel}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="w-[200px] bg-jaguarblue-800 border-jaguarblue-700">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="bg-jaguarblue-800 border-jaguarblue-700">
          {availableModels.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.provider}: {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
