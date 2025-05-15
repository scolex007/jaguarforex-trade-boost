
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Plus } from "lucide-react";

interface RegistrationTypeSelectorProps {
  registrationType: 'new' | 'existing';
  onTypeChange: (value: 'new' | 'existing') => void;
}

const RegistrationTypeSelector = ({ 
  registrationType, 
  onTypeChange 
}: RegistrationTypeSelectorProps) => {
  return (
    <div className="bg-jaguarblue-700 rounded-lg p-6 mb-6">
      <RadioGroup 
        value={registrationType}
        onValueChange={(value) => onTypeChange(value as 'new' | 'existing')}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new-account" />
          <Label htmlFor="new-account" className="flex items-center">
            <Plus className="mr-2" size={16} />
            Add a new account
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing-account" />
          <Label htmlFor="existing-account" className="flex items-center">
            <ArrowRight className="mr-2" size={16} />
            Transfer an existing account
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RegistrationTypeSelector;
