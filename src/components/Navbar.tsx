
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import UserMenu from "./navbar/UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    // Navigation is now handled within the AuthContext
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
          <DesktopMenu 
            isResourcesMenuOpen={isResourcesMenuOpen}
            toggleResourcesMenu={toggleResourcesMenu}
          />

          {/* User Menu (Login/Register or Member Area/Logout) */}
          <UserMenu handleLogout={handleLogout} />

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
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          isResourcesMenuOpen={isResourcesMenuOpen}
          setIsResourcesMenuOpen={setIsResourcesMenuOpen}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
