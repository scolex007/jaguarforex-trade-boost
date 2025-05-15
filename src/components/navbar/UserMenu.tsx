
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface UserMenuProps {
  handleLogout: () => void;
}

const UserMenu = ({ handleLogout }: UserMenuProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-2">
      {isAuthenticated ? (
        <>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-jaguargold text-jaguargold hover:text-jaguarblue-900"
            asChild
          >
            <Link to="/dashboard">
              <User size={16} className="mr-2" />
              Member Area
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={handleLogout}
            className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
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
  );
};

export default UserMenu;
