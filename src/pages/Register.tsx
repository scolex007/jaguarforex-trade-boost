
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import CountrySelect from '@/components/CountrySelect';
import PhoneInput from '@/components/PhoneInput';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    country: '',
    mobile: '',
    password: '',
    repassword: '',
    sponsor: '',
    tos: false
  });
  const [dialCode, setDialCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState(''); // Honeypot field
  const [lastAttempt, setLastAttempt] = useState<number>(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const { register, error, loading } = useAuth();
  
  // Store first visit timestamp to prevent too quick submissions
  const firstVisit = useRef(Date.now());

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidUsername = (username: string) => {
    return /^[a-zA-Z0-9_]{4,16}$/.test(username);
  };
  
  // Strong password validation
  const isStrongPassword = (password: string) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCountryChange = (code: string, newDialCode: string) => {
    setFormData(prev => ({
      ...prev,
      country: code
    }));
    setDialCode(newDialCode);
    
    // Clear error when user selects a country
    if (errors.country) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.country;
        return newErrors;
      });
    }
  };

  const handleMobileChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      mobile: value
    }));
    
    // Clear error when user types a mobile number
    if (errors.mobile) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.mobile;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Too fast form completion (likely a bot)
    if (Date.now() - firstVisit.current < 3000) {
      toast.error("Please review your information before submitting");
      return false;
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = "Username must be 4-16 characters with only letters, numbers, and underscores";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country) {
      newErrors.country = "Please select your country";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isStrongPassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }
    
    if (formData.password !== formData.repassword) {
      newErrors.repassword = "Passwords don't match";
    }
    
    if (!formData.tos) {
      newErrors.tos = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently fail
    if (honeypot) {
      console.log("Honeypot triggered");
      // Simulate success but don't actually register
      toast.success('Processing your registration...');
      setTimeout(() => {
        toast.error('Registration failed. Please try again later.');
      }, 2000);
      return;
    }

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastAttempt < 5000) { // 5 seconds between attempts
      toast.error('Please wait before trying again');
      return;
    }
    setLastAttempt(now);
    
    // Track number of attempts in a session
    setAttemptCount(prev => prev + 1);
    if (attemptCount >= 3) {
      toast.error('Too many registration attempts. Please try again later.');
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      toast.success("Registration successful! Please check your email.");
    } catch (err) {
      // Error is handled in auth context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Add some defense against automation
  useEffect(() => {
    // Add a small delay to form loading to defeat simple bots
    const timer = setTimeout(() => {
      // This just ensures the form doesn't load instantly
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (success) {
    return (
      <div className="min-h-screen bg-jaguarblue-800">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto bg-jaguarblue-700 border-jaguarblue-600">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-jaguargold mb-4">Registration Successful!</h2>
                <p className="text-gray-200 mb-6">
                  Please check your email to activate your account.
                </p>
                <Button className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900" asChild>
                  <Link to="/login">Go to Login</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto bg-jaguarblue-700 border-jaguarblue-600">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Hidden honeypot field */}
              <div className="absolute opacity-0 pointer-events-none">
                <Input 
                  type="text"
                  name="user_profile"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">First Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your first name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.name ? 'border-red-500' : ''}`}
                    data-lpignore="true" // Prevent LastPass from auto-filling
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-gray-200">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.last_name ? 'border-red-500' : ''}`}
                    data-lpignore="true"
                  />
                  {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-200">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Create a username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.username ? 'border-red-500' : ''}`}
                    data-lpignore="true"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.email ? 'border-red-500' : ''}`}
                    data-lpignore="true"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <CountrySelect
                    value={formData.country}
                    onChange={handleCountryChange}
                    required
                    error={errors.country}
                  />
                </div>

                <div>
                  <PhoneInput
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    dialCode={dialCode}
                    error={errors.mobile}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.password ? 'border-red-500' : ''}`}
                      data-lpignore="true"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repassword" className="text-gray-200">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="repassword"
                      name="repassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.repassword}
                      onChange={handleChange}
                      required
                      className={`bg-jaguarblue-800 border-jaguarblue-600 ${errors.repassword ? 'border-red-500' : ''}`}
                      data-lpignore="true"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword}</p>}
                </div>

                <div className="col-span-full space-y-2">
                  <Label htmlFor="sponsor" className="text-gray-200">Sponsor (Optional)</Label>
                  <Input
                    id="sponsor"
                    name="sponsor"
                    placeholder="Sponsor code (if any)"
                    value={formData.sponsor}
                    onChange={handleChange}
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                    data-lpignore="true"
                  />
                </div>

                <div className="col-span-full flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="tos" 
                    name="tos"
                    checked={formData.tos}
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({
                        ...prev,
                        tos: checked === true
                      }));
                      
                      if (errors.tos) {
                        setErrors(prev => {
                          const newErrors = {...prev};
                          delete newErrors.tos;
                          return newErrors;
                        });
                      }
                    }}
                    required
                  />
                  <label 
                    htmlFor="tos" 
                    className={`text-sm font-medium leading-none ${errors.tos ? 'text-red-500' : 'text-gray-200'} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                  >
                    I agree to the <Link to="/terms" className="text-jaguargold hover:underline">Terms and Conditions</Link>
                  </label>
                </div>
                {errors.tos && <p className="text-red-500 text-sm mt-1">{errors.tos}</p>}

                <div className="col-span-full mt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
                  >
                    {loading ? 'Processing...' : 'Register'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-jaguargold hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
