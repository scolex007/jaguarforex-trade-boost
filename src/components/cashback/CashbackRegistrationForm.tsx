
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Broker } from '@/data/brokersData';
import { tradingService } from '../../api/tradingService';
import { Loader2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  authorizeContact: z.boolean().refine(val => val === true, {
    message: 'You must authorize JaguarForex to contact the broker'
  })
});

interface CashbackRegistrationFormProps {
  broker: Broker | null;
  onSuccess: () => void;
}

const CashbackRegistrationForm = ({ broker, onSuccess }: CashbackRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      accountNumber: '',
      authorizeContact: false
    }
  });

  const handleCashbackRedirect = () => {
    if (!broker?.affiliateLink) {
      toast.error('This broker doesn\'t have an affiliate link configured.');
      return;
    }
    
    window.open(broker.affiliateLink, '_blank');
    toast.success('Opening broker registration page in a new tab.');
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!broker) {
      toast.error('No broker selected');
      return;
    }

    setIsSubmitting(true);
    try {
      // Register account using the trading service
      await tradingService.registerAccount({
        broker: broker.name,
        accountNumber: values.accountNumber
      });
      
      toast.success('Your cashback registration has been submitted successfully.');
      form.reset();
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to register account';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Step 1. Open an {broker?.name} account</h2>
        <div className="space-y-4">
          <Button 
            className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
            onClick={handleCashbackRedirect}
          >
            Open Broker Website
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Step 2. Enter your account details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your account number" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="authorizeContact"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I authorize JaguarForex to contact {broker?.name} on my behalf, if needed to set JaguarForex as my referrer (IB)
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : 'Submit'}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default CashbackRegistrationForm;
