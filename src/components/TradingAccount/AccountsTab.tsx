
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import AccountRegistrationModal from "./AccountRegistrationModal";

// Types for our account data
interface TradingAccount {
  id: string;
  brokerId: string;
  brokerName: string;
  accountNumber: string;
  status: "pending" | "approved" | "rejected";
  registrationDate: string;
  isDemo: boolean;
}

type StatusFilter = "all" | "pending" | "approved" | "rejected";

const AccountsTab = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to fetch accounts - will be implemented later
  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockAccounts: TradingAccount[] = [
        {
          id: "1",
          brokerId: "exness",
          brokerName: "Exness",
          accountNumber: "EX123456789",
          status: "approved",
          registrationDate: "2023-10-15T10:20:30Z",
          isDemo: false
        },
        {
          id: "2",
          brokerId: "icmarkets",
          brokerName: "IC Markets",
          accountNumber: "IC987654321",
          status: "pending",
          registrationDate: "2023-10-18T15:45:20Z",
          isDemo: true
        }
      ];
      
      setAccounts(mockAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAccounts();
  }, []);
  
  const filteredAccounts = accounts.filter(account => 
    statusFilter === "all" || account.status === statusFilter
  );
  
  const handleRefresh = () => {
    fetchAccounts();
  };
  
  const handleModalSuccess = () => {
    fetchAccounts();
  };
  
  // Fixed the function to return a valid Badge variant
  const getStatusBadgeProps = (status: TradingAccount["status"]) => {
    switch(status) {
      case "approved":
        return { variant: "default" as const, className: "bg-green-500" };
      case "pending":
        return { variant: "secondary" as const, className: "bg-amber-500 text-amber-900" };
      case "rejected":
        return { variant: "destructive" as const };
      default:
        return { variant: "outline" as const };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">My Trading Accounts</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button onClick={() => setIsModalOpen(true)}>
            Register Account
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={statusFilter} className="mt-0">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <p>Loading accounts...</p>
            </div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-10 bg-jaguarblue-700 rounded-lg border border-jaguarblue-600">
              <p className="text-gray-300 mb-3">No accounts found</p>
              <Button onClick={() => setIsModalOpen(true)}>
                Register Account
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAccounts.map((account) => (
                <Card key={account.id} className="bg-jaguarblue-700 border-jaguarblue-600">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{account.brokerName}</h3>
                        <p className="text-sm text-gray-300">Account: {account.accountNumber}</p>
                        <p className="text-xs text-gray-400">
                          Registered on {new Date(account.registrationDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge {...getStatusBadgeProps(account.status)}>
                          {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                        </Badge>
                        {account.isDemo && (
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            Demo Account
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <AccountRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default AccountsTab;
