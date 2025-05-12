
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PhpBackend = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-jaguargold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-jaguarblue-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-jaguarblue-700 border border-jaguarblue-600 rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-white">JaguarForex Backend</h1>
        </div>
        <div className="bg-jaguarblue-700 border border-jaguarblue-600 rounded-lg overflow-hidden">
          <iframe
            src="https://my.jaguarforex.com"
            className="w-full h-[calc(100vh-300px)] min-h-[600px]"
            title="JaguarForex Backend"
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhpBackend;
