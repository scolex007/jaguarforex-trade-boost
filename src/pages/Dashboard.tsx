
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { User, LogOut, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsTab from '@/components/TradingAccount/AccountsTab';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    // If auth is fully loaded and no user, redirect to login
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    await logout();
    // Navigation is handled in the AuthContext
  };

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-jaguarblue-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jaguargold"></div>
      </div>
    );
  }

  // Only render dashboard content if we have a user
  if (!user) {
    return null; // Will be redirected by the useEffect above
  }

  return (
    <div className="min-h-screen bg-jaguarblue-800">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="bg-jaguarblue-700 border border-jaguarblue-600 rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-jaguargold text-jaguargold hover:bg-jaguargold hover:text-jaguarblue-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <div className="p-6 bg-jaguarblue-800 rounded-lg border border-jaguarblue-600 mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-jaguarblue-700 p-3 rounded-full">
                <User className="h-8 w-8 text-jaguargold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Welcome, {user?.name}</h2>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="accounts">Trading Accounts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-jaguarblue-800 p-6 rounded-lg border border-jaguarblue-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">Member since: <span className="text-white">May 2023</span></p>
                    <p className="text-gray-300">Subscription: <span className="text-jaguargold">Premium</span></p>
                    <p className="text-gray-300">Tools downloaded: <span className="text-white">5</span></p>
                  </div>
                </div>
                
                <div className="bg-jaguarblue-800 p-6 rounded-lg border border-jaguarblue-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="border-b border-jaguarblue-600 pb-2">
                      <p className="text-sm text-gray-400">Yesterday</p>
                      <p className="text-white">Downloaded JaguarTrend Pro EA</p>
                    </div>
                    <div className="border-b border-jaguarblue-600 pb-2">
                      <p className="text-sm text-gray-400">Last Week</p>
                      <p className="text-white">Updated account settings</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-jaguarblue-800 p-6 rounded-lg border border-jaguarblue-600">
                <h3 className="text-lg font-semibold text-white mb-4">Access PHP Backend</h3>
                <p className="text-gray-300 mb-4">
                  Access our legacy system for additional features and functionality.
                </p>
                <Button 
                  asChild
                  className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
                >
                  <Link to="/backend">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Access PHP Backend
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="accounts" className="w-full">
              <AccountsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
