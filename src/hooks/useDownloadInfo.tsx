
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useDownloadInfo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to download tools");
      navigate("/login");
      return;
    }
    
    // Open the dialog for authenticated users
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    isDialogOpen,
    handleDownloadClick,
    closeDialog
  };
};
