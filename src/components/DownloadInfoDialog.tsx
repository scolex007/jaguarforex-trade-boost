
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DownloadInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadInfoDialog = ({ isOpen, onClose }: DownloadInfoDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-jaguarblue-700 border-jaguarblue-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Download Information</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-300 py-4">
          Download will be available by Monday, June 2, 2025, 8pm Singapore time. 
          Thank you for your patience.
        </DialogDescription>
        <DialogFooter>
          <Button 
            onClick={onClose} 
            className="bg-jaguargold hover:bg-jaguargold/90 text-jaguarblue-900"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadInfoDialog;
