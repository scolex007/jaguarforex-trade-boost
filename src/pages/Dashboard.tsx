
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out successfully');
    // Navigate is handled by the navbar component which will detect the auth state change
  };

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
