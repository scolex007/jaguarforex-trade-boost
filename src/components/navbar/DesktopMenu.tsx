
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DesktopMenuProps {
  isResourcesMenuOpen: boolean;
  toggleResourcesMenu: (e: React.MouseEvent) => void;
}

const DesktopMenu = ({ isResourcesMenuOpen, toggleResourcesMenu }: DesktopMenuProps) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <Link to="/#features" className="nav-item">Features</Link>
      <Link to="/tools" className="nav-item">Trading Tools</Link>
      <Link to="/cashback" className="nav-item">Cashback</Link>
      <Link to="/ai" className="nav-item">AI</Link>
      
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
          <Link to="/resources/market-analysis" className="block px-4 py-2 hover:bg-jaguarblue-700">Market Analysis</Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
