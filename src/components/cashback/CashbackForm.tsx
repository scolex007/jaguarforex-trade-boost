
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CountrySelect from "@/components/CountrySelect";

// Define the form schema
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(2, {
    message: "Please select a country.",
  }),
  broker: z.string().min(1, {
    message: "Please select a broker.",
  }),
});

const CashbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      country: "",
      broker: "",
    },
  });

  // Define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // This would normally be a real API call
      console.log("Form submitted with values:", values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Success! Redirecting to registration...");
      
      // Redirect to the registration page (would typically happen after server response)
      setTimeout(() => {
        window.location.href = "/register";
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was a problem submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="cashback-form" className="bg-jaguarblue-700 rounded-xl border border-jaguarblue-600 p-6 shadow-lg mb-16">
      <h3 className="text-xl font-bold mb-4 text-center">Start Earning Cashback Today</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelect onValueChange={field.onChange} defaultValue={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="broker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Broker</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="">Select a broker</option>
                      <option value="exness">Exness</option>
                      <option value="ic_markets">IC Markets</option>
                      <option value="roboforex">RoboForex</option>
                      <option value="fxpro">FxPro</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Claim My Cashback"}
          </Button>
          
          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </form>
      </Form>
    </div>
  );
};

export default CashbackForm;
