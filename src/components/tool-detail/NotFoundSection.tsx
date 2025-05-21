
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundSection() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">Tool Not Found</h1>
      <p className="text-gray-300 mb-8">The tool you are looking for does not exist or has been removed.</p>
      <Button asChild>
        <Link to="/tools" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Tools
        </Link>
      </Button>
    </div>
  );
}
