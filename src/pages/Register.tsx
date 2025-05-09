
import React, { useState } from 'react';
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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    country: '',
    mobile: '',
    sponsor: '',
    tos: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, error, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (formData.password !== formData.repassword) {
      toast.error("Passwords don't match");
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
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                  />
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
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                  />
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
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                  />
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
                    className="bg-jaguarblue-800 border-jaguarblue-600"
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
                      className="bg-jaguarblue-800 border-jaguarblue-600"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
                      className="bg-jaguarblue-800 border-jaguarblue-600"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-200">Country</Label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full h-10 rounded-md border border-jaguarblue-600 bg-jaguarblue-800 px-3 py-2 text-base text-white"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-gray-200">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                  />
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
                    }}
                    required
                  />
                  <label 
                    htmlFor="tos" 
                    className="text-sm font-medium leading-none text-gray-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the <Link to="/terms" className="text-jaguargold hover:underline">Terms and Conditions</Link>
                  </label>
                </div>

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
