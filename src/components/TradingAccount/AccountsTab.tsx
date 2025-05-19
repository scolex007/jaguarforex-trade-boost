import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';
import { tradingService, TradingAccount } from '../../api/tradingService';
import { formatDate, getRelativeTime } from '../../utils/dateUtils';
import AccountRegistrationModal from './AccountRegistrationModal';

// Helper function to get badge variant based on status
const getStatusBadge = (status: string) => {
  switch (status) {
    case '0':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
    case '1':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
    case '2':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const AccountsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch accounts when component mounts or when a new account is registered
  const fetchAccounts = async (status: string = 'all') => {
    setLoading(true);
    try {
      const statusMap: Record<string, string | null> = {
        'all': null,
        'pending': '0',
        'approved': '1',
        'rejected': '2'
      };
      
      const data = await tradingService.getAccounts(statusMap[status]);
      setAccounts(data);
    } catch (error) {
      toast.error('Failed to fetch accounts');
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts(activeTab);
  }, [activeTab]);

  // Filter accounts based on active tab
  const getFilteredAccounts = () => {
    if (activeTab === 'all') return accounts;
    
    const statusMap: Record<string, string> = {
      'pending': '0',
      'approved': '1',
      'rejected': '2'
    };
    
    return accounts.filter(account => account.status === statusMap[activeTab]);
  };

  const handleRefresh = () => {
    fetchAccounts(activeTab);
    toast.success('Accounts refreshed');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Trading Accounts</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-jaguargold text-jaguarblue-900 hover:bg-jaguargold/90"
            size="sm"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Register Account
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
            </div>
          ) : getFilteredAccounts().length > 0 ? (
            getFilteredAccounts().map((account) => (
              <Card key={account.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{account.service}</CardTitle>
                      <CardDescription>
                        Account: {account.account_number} 
                        {account.is_demo === '1' && ' (Demo)'}
                      </CardDescription>
                    </div>
                    {getStatusBadge(account.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm text-gray-500">
                    Registered: {formatDate(account.dated)}
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-gray-400 pt-0">
                  {getRelativeTime(account.dated)}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No accounts found</h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {activeTab === 'all' 
                  ? "You haven't registered any trading accounts yet." 
                  : `You don't have any ${activeTab} trading accounts.`}
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="mt-6"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Register Account
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AccountRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchAccounts(activeTab);
        }}
      />
    </div>
  );
};

export default AccountsTab;