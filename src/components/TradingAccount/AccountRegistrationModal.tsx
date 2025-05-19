
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { tradingService } from '../../api/tradingService';
import AccountRegistrationForm from './AccountRegistrationForm';
import { AccountRegistrationFormValues } from './schemas/accountRegistrationSchema';

interface AccountRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AccountRegistrationModal = ({ isOpen, onClose, onSuccess }: AccountRegistrationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: AccountRegistrationFormValues) => {
    setIsLoading(true);
    try {
      await tradingService.registerAccount({
        broker: values.broker,
        accountNumber: values.accountNumber,
        isDemo: values.isDemo,
      });
      
      toast.success('Account registration request submitted successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to register account';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isLoading && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-jaguarblue-700 border-jaguarblue-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Register Trading Account</DialogTitle>
        </DialogHeader>
        
        <AccountRegistrationForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        <DialogFooter className="mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
            className="border-gray-600 text-gray-300 hover:bg-jaguarblue-600"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="account-registration-form"
            disabled={isLoading}
            className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountRegistrationModal;
