
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface MobileMenuProps {
  isMenuOpen: boolean;
  isResourcesMenuOpen: boolean;
  setIsResourcesMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu = ({ 
  isMenuOpen, 
  isResourcesMenuOpen, 
  setIsResourcesMenuOpen,
  handleLogout
}: MobileMenuProps) => {
  const { isAuthenticated } = useAuth();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden mt-2 py-2">
      <Link to="/#features" className="block py-2 px-4 hover:bg-jaguarblue-700">Features</Link>
      <Link to="/tools" className="block py-2 px-4 hover:bg-jaguarblue-700">Trading Tools</Link>
      <Link to="/cashback" className="block py-2 px-4 hover:bg-jaguarblue-700">Cashback</Link>
      <Link to="/ai" className="block py-2 px-4 hover:bg-jaguarblue-700">AI</Link>
      
      <div className="py-2 px-4">
        <button 
          className="flex items-center justify-between w-full hover:bg-jaguarblue-700 py-2"
          onClick={(e) => {
            e.stopPropagation();
            setIsResourcesMenuOpen(!isResourcesMenuOpen);
          }}
        >
          <span>Resources</span>
          <ChevronDown className={`h-4 w-4 transform transition-transform ${isResourcesMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isResourcesMenuOpen && (
          <div className="pl-4 mt-1 border-l border-jaguarblue-600">
            <Link to="/resources/trading-guide" className="block py-2 hover:bg-jaguarblue-700">
              Trading Guide
            </Link>
            <Link to="/resources/market-analysis" className="block py-2 hover:bg-jaguarblue-700">
              Market Analysis
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-col space-y-2 px-4">
        {isAuthenticated ? (
          <>
            <Button 
              variant="outline"
              className="border-jaguargold text-jaguargold hover:text-jaguarblue-900 w-full flex justify-center items-center"
              asChild
            >
              <Link to="/dashboard">
                <User size={16} className="mr-2" />
                Member Area
              </Link>
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 w-full flex justify-center items-center"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-jaguargold text-jaguargold hover:text-jaguarblue-900 w-full"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button 
              size="sm" 
              className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 w-full"
              asChild
            >
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
