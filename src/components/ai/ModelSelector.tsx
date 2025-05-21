
import { ModelOption } from '@/services/aiAssistantService';

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableModels: ModelOption[];
}

// This is a temporarily simplified version that doesn't show the dropdown
const ModelSelector = ({ selectedModel, setSelectedModel, availableModels }: ModelSelectorProps) => {
  // Function is kept for future reimplementation
  const handleModelChange = (value: string) => {
    console.log('Model changed to:', value);
    setSelectedModel(value);
  };

  // Find the current model (not displayed in the minimalist design)
  const currentModel = availableModels.find(model => model.id === selectedModel);
  
  // Return empty fragment - dropdown temporarily removed
  return <></>;
};

export default ModelSelector;
