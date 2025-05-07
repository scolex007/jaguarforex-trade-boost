
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-jaguarblue-800/95 sticky top-0 z-50 backdrop-blur-sm border-b border-jaguarblue-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">
                JaguarForex
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#features" className="nav-item">Features</a>
            <a href="#tools" className="nav-item">Trading Tools</a>
            <a href="#cashback" className="nav-item">Cashback</a>
            <a href="#faq" className="nav-item">FAQ</a>
            
            <div className="relative group ml-2">
              <button className="nav-item flex items-center">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-jaguarblue-800 border border-jaguarblue-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a href="#" className="block px-4 py-2 hover:bg-jaguarblue-700">Trading Guides</a>
                <a href="#" className="block px-4 py-2 hover:bg-jaguarblue-700">Market Analysis</a>
                <a href="#" className="block px-4 py-2 hover:bg-jaguarblue-700">Video Tutorials</a>
              </div>
            </div>
          </div>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-jaguargold text-jaguargold hover:text-jaguarblue-900" onClick={() => window.location.href = "https://my.jaguarforex.com/auth/login"}>
              Login
            </Button>
            <Button size="sm" className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900" onClick={() => window.location.href = "https://my.jaguarforex.com/auth/register/jaguarforex"}>
              Register
            </Button>
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
            <a href="#features" className="block py-2 px-4 hover:bg-jaguarblue-700">Features</a>
            <a href="#tools" className="block py-2 px-4 hover:bg-jaguarblue-700">Trading Tools</a>
            <a href="#cashback" className="block py-2 px-4 hover:bg-jaguarblue-700">Cashback</a>
            <a href="#faq" className="block py-2 px-4 hover:bg-jaguarblue-700">FAQ</a>
            <a href="#" className="block py-2 px-4 hover:bg-jaguarblue-700">Resources</a>
            
            <div className="mt-4 flex flex-col space-y-2 px-4">
              <Button variant="outline" size="sm" className="border-jaguargold text-jaguargold hover:text-jaguarblue-900 w-full" onClick={() => window.location.href = "https://my.jaguarforex.com/auth/login"}>
                Login
              </Button>
              <Button size="sm" className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900 w-full" onClick={() => window.location.href = "https://my.jaguarforex.com/auth/register/jaguarforex"}>
                Register
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
