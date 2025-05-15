
// Re-export sonner for consistency
import { toast } from "sonner";
export { toast };

// Re-export useToast from the hooks file (but not toast to avoid circular dependency)
import { useToast } from "@/hooks/use-toast";
export { useToast };
