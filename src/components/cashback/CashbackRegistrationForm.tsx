
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Broker } from "@/data/brokersData";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface CashbackRegistrationFormProps {
  broker: Broker | null;
  onSuccess?: () => void;
}

const registrationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  authorizeContact: z.boolean().refine(val => val === true, {
    message: "You must authorize us to contact the broker"
  })
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const CashbackRegistrationForm = ({ broker, onSuccess }: CashbackRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      accountNumber: "",
      authorizeContact: false
    }
  });

  const handleBrokerLinkClick = () => {
    if (!broker?.affiliateLink) {
      toast.error("No affiliate link available for this broker");
      return;
    }
    
    // Open broker affiliate link in new tab
    window.open(broker.affiliateLink, "_blank", "noopener,noreferrer");
    
    // Advance to step 2
    setStep(2);
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // TODO: API call to register account will go here
      console.log("Form submitted with data:", {
        brokerId: broker?.id,
        ...data
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account registered successfully! You will receive cashback on your trades.");
      
      if (onSuccess) {
        onSuccess();
      }
      
      form.reset();
    } catch (error) {
      console.error("Error registering account:", error);
      toast.error("Failed to register account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!broker) {
    return <p>Please select a broker to continue.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Open broker website and create account */}
      <Card className={`p-6 ${step === 2 ? 'opacity-60' : ''}`}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Step 1: Open broker website and create account
          </h3>
          <p className="text-sm text-gray-300">
            Click the button below to open the broker's website. Register a new account or login to your existing account through our referral link to receive cashback on your trades.
          </p>
          <Button 
            onClick={handleBrokerLinkClick}
            disabled={!broker.affiliateLink || step === 2}
            className="w-full"
          >
            Open {broker.name} Website <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Step 2: Register account details */}
      <Card className={`p-6 ${step === 1 ? 'opacity-60' : ''}`}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Step 2: Register your account details
          </h3>
          
          {step === 1 ? (
            <p className="text-sm text-gray-300">
              Please complete step 1 first by creating an account with the broker.
            </p>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
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
                      <FormLabel>{broker.name} Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your account number" {...field} />
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
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I authorize JaguarForex to contact {broker.name} on my behalf if needed
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register for Cashback"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CashbackRegistrationForm;
