
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
    console.log('Model changed to:', value);
    setSelectedModel(value);
  };

  // Find the currently selected model
  const currentModel = availableModels.find(model => model.id === selectedModel);
  const displayName = currentModel ? `${currentModel.provider}: ${currentModel.name}` : selectedModel;

  return (
    <div className="flex items-center">
      <Select
        value={selectedModel}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="w-[200px] bg-jaguarblue-800 border-jaguarblue-700">
          <SelectValue placeholder="Select a model">
            {displayName}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-jaguarblue-800 border-jaguarblue-700">
          <SelectGroup>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.provider}: {model.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
