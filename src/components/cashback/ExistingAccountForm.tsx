
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Broker } from "@/data/brokersData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ExistingAccountFormProps {
  broker: Broker | null;
  onSubmit: (data: any) => void;
}

const ExistingAccountForm = ({ broker, onSubmit }: ExistingAccountFormProps) => {
  const formSchema = z.object({
    accountType: z.string().min(1, "Account type is required"),
    platform: z.string().min(1, "Platform is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    authorizeContact: z.boolean().refine(val => val === true, {
      message: "You must authorize JaguarForex to contact the broker"
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: "",
      platform: "",
      dateOfBirth: "",
      address: "",
      email: "",
      name: "",
      accountNumber: "",
      authorizeContact: false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Step 1. Select the account type</h2>
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {broker?.accountTypes.map((type, index) => (
                      <SelectItem key={index} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Step 2. Select the trading platform</h2>
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {broker?.platforms.map((platform, index) => (
                      <SelectItem key={index} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Step 3. Enter your account details</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your registered address at {broker?.name}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
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
                  <FormLabel>Your email used at {broker?.name}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on your {broker?.name} account</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
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
                  <FormLabel>Account number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
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
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default ExistingAccountForm;
