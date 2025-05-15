
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Broker } from "@/data/brokersData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface NewAccountFormProps {
  broker: Broker | null;
  onSubmit: (data: any) => void;
}

const NewAccountForm = ({ broker, onSubmit }: NewAccountFormProps) => {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    authorizeContact: z.boolean().refine(val => val === true, {
      message: "You must authorize JaguarForex to contact the broker"
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      accountNumber: "",
      authorizeContact: false
    }
  });

  const handleCashbackRedirect = () => {
    if (!broker?.affiliateLink) {
      toast({
        title: "No affiliate link",
        description: "This broker doesn't have an affiliate link configured.",
        variant: "destructive"
      });
      return;
    }
    
    window.open(broker.affiliateLink, '_blank');
    toast({
      title: "Redirecting to broker",
      description: "Opening broker registration page in a new tab."
    });
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
            Monthly Cash Back
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Step 2. Enter your account details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
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
                    <Input {...field} placeholder="Enter your account number" />
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
                      I authorise JaguarForex to contact {broker?.name} on my behalf, if needed to set JaguarForex as my referrer (IB)
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default NewAccountForm;
