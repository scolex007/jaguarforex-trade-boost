
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close menus when clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsUserMenuOpen(false);
      setIsResourcesMenuOpen(false);
    };
    
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);
  
  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const toggleResourcesMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResourcesMenuOpen(!isResourcesMenuOpen);
  };

  return (
    <nav className="bg-jaguarblue-800/95 sticky top-0 z-50 backdrop-blur-sm border-b border-jaguarblue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">
                JaguarForex
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="/#features" className="nav-item">Features</a>
            <a href="/#tools" className="nav-item">Trading Tools</a>
            <a href="/#cashback" className="nav-item">Cashback</a>
            <a href="/#faq" className="nav-item">FAQ</a>
            
            <div className="relative group">
              <button 
                className="nav-item flex items-center"
                onClick={toggleResourcesMenu}
              >
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className={`absolute right-0 mt-2 w-48 bg-jaguarblue-800 border border-jaguarblue-700 rounded-md shadow-lg transition-all duration-200 ${isResourcesMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <Link to="/resources/trading-guide" className="block px-4 py-2 hover:bg-jaguarblue-700">Trading Guide</Link>
                <a href="#" className="block px-4 py-2 hover:bg-jaguarblue-700">Market Analysis</a>
                <a href="#" className="block px-4 py-2 hover:bg-jaguarblue-700">Video Tutorials</a>
              </div>
            </div>
          </div>

          {/* Login/Register Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-jaguargold text-jaguargold hover:text-jaguarblue-900 flex items-center gap-2"
                  onClick={toggleUserMenu}
                >
                  <User size={16} />
                  {user?.name || 'Account'}
                  <ChevronDown size={14} />
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-jaguarblue-800 border border-jaguarblue-700 rounded-md shadow-lg z-50">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-jaguarblue-700">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-jaguarblue-700">
                      Profile Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-jaguarblue-700 flex items-center"
                    >
                      <LogOut size={14} className="mr-2" /> 
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-jaguargold text-jaguargold hover:text-jaguarblue-900"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
                  asChild
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2">
            <a href="/#features" className="block py-2 px-4 hover:bg-jaguarblue-700">Features</a>
            <a href="/#tools" className="block py-2 px-4 hover:bg-jaguarblue-700">Trading Tools</a>
            <a href="/#cashback" className="block py-2 px-4 hover:bg-jaguarblue-700">Cashback</a>
            <a href="/#faq" className="block py-2 px-4 hover:bg-jaguarblue-700">FAQ</a>
            
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
                  <a href="#" className="block py-2 hover:bg-jaguarblue-700">
                    Market Analysis
                  </a>
                  <a href="#" className="block py-2 hover:bg-jaguarblue-700">
                    Video Tutorials
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-col space-y-2 px-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block py-2 hover:bg-jaguarblue-700">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block py-2 hover:bg-jaguarblue-700 flex items-center"
                  >
                    <LogOut size={14} className="mr-2" /> 
                    Logout
                  </button>
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
