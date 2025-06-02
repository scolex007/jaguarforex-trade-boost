
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import tradingService, { Broker } from '../../api/tradingService';
import { accountRegistrationSchema, AccountRegistrationFormValues } from './schemas/accountRegistrationSchema';

interface AccountRegistrationFormProps {
  onSubmit: (values: AccountRegistrationFormValues) => void;
  isLoading: boolean;
}

const AccountRegistrationForm = ({ onSubmit, isLoading }: AccountRegistrationFormProps) => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  
  // Initialize form
  const form = useForm<AccountRegistrationFormValues>({
    resolver: zodResolver(accountRegistrationSchema),
    defaultValues: {
      broker: '',
      accountNumber: '',
      authorizeContact: false,
      isDemo: false,
    },
  });

  // Fetch brokers on component mount
  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const data = await tradingService.getBrokers();
        setBrokers(data);
      } catch (error) {
        toast.error('Failed to fetch brokers');
        console.error('Error fetching brokers:', error);
      }
    };

    fetchBrokers();
  }, []);

  return (
    <Form {...form}>
      <form id="account-registration-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="broker"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Select Broker</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="bg-jaguarblue-800 border-jaguarblue-600">
                    <SelectValue placeholder="Select a broker" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-jaguarblue-800 border-jaguarblue-600">
                  {brokers.map((broker) => (
                    <SelectItem key={broker.id} value={broker.name}>
                      {broker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Account Number</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter your account number" 
                  disabled={isLoading}
                  className="bg-jaguarblue-800 border-jaguarblue-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isDemo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  className="data-[state=checked]:bg-jaguargold data-[state=checked]:border-jaguargold"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-gray-300">
                  This is a demo account
                </FormLabel>
              </div>
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
                  disabled={isLoading}
                  className="data-[state=checked]:bg-jaguargold data-[state=checked]:border-jaguargold"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer text-gray-300">
                  I authorize JaguarForex to contact the broker on my behalf, if needed to set JaguarForex as my referrer (IB)
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AccountRegistrationForm;
