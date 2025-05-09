
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in auth context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto bg-jaguarblue-700 border-jaguarblue-600">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-white">Login to Your Account</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-jaguarblue-800 border-jaguarblue-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-jaguargold hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-jaguargold hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
