
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus } from "lucide-react";
import { getBrokerById } from "@/data/brokersData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CashbackRegister = () => {
  const [searchParams] = useSearchParams();
  const brokerId = searchParams.get('broker');
  const broker = brokerId ? getBrokerById(brokerId) : null;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [registrationType, setRegistrationType] = useState<'new' | 'existing'>('new');
  
  useEffect(() => {
    if (!broker) {
      toast({
        title: "Broker not found",
        description: "Please select a broker from the cashback page.",
        variant: "destructive"
      });
      navigate('/cashback');
    }
  }, [broker, navigate]);

  // Define validation schema based on registration type
  const newAccountSchema = z.object({
    accountType: z.string().optional(),
    platform: z.string().optional(),
    accountNumber: z.string().min(1, "Account number is required"),
    authorizeContact: z.boolean().refine(val => val === true, {
      message: "You must authorize JaguarForex to contact the broker"
    })
  });

  const existingAccountSchema = z.object({
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

  // Use the appropriate schema based on registration type
  const formSchema = registrationType === 'new' ? newAccountSchema : existingAccountSchema;
  
  // Initialize the form
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit your cashback registration",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Here you would typically send data to your backend
    console.log("Submitting form data:", {
      userId: user?.id,
      broker: broker?.id,
      registrationType,
      ...data
    });
    
    toast({
      title: "Registration submitted",
      description: "Your cashback registration has been submitted successfully."
    });
    
    // Reset form
    form.reset();
  };
  
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
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            {broker?.logo && (
              <div className="bg-white p-2 rounded w-12 h-12 flex items-center justify-center">
                <img 
                  src={broker.logo} 
                  alt={`${broker?.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">
              Setup cash back | <span className="text-jaguargold">{broker?.name}</span>
            </h1>
          </div>
          
          <div className="bg-jaguarblue-700 rounded-lg p-6 mb-6">
            <RadioGroup 
              value={registrationType}
              onValueChange={(value) => setRegistrationType(value as 'new' | 'existing')}
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
          
          {registrationType === 'new' ? (
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
          ) : (
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CashbackRegister;
