
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CashbackTable = () => {
  const rebateData = [
    { broker: "Exness", accountTypes: [
      { name: "Standard", rebate: "$2.00 per lot" },
      { name: "Raw Spread", rebate: "$2.00 per lot" },
      { name: "Zero", rebate: "$1.50 per lot" },
    ]},
    { broker: "IC Markets", accountTypes: [
      { name: "Standard", rebate: "$2.00 per lot" },
      { name: "Raw Spread", rebate: "$1.75 per lot" },
    ]},
    { broker: "RoboForex", accountTypes: [
      { name: "Standard", rebate: "$2.00 per lot" },
      { name: "ECN", rebate: "$1.80 per lot" },
    ]},
    { broker: "FxPro", accountTypes: [
      { name: "Standard", rebate: "$1.90 per lot" },
      { name: "Edge", rebate: "$1.70 per lot" },
    ]},
  ];

  return (
    <section className="py-16 bg-jaguarblue-900" id="rebate-tiers">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Rebate Tiers by Broker</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-bold text-white">Broker</TableHead>
                <TableHead className="text-left font-bold text-white">Account Type</TableHead>
                <TableHead className="text-left font-bold text-white">Rebate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rebateData.map((broker, brokerIndex) => (
                broker.accountTypes.map((account, accountIndex) => (
                  <TableRow key={`${brokerIndex}-${accountIndex}`}>
                    {accountIndex === 0 ? (
                      <TableCell className="font-medium" rowSpan={broker.accountTypes.length}>
                        {broker.broker}
                      </TableCell>
                    ) : null}
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-jaguargold font-semibold">{account.rebate}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </div>
        
        <p className="text-sm text-gray-400 mt-4 text-center">
          Rebates are calculated based on standard lot size (100,000 units of the base currency).
        </p>
      </div>
    </section>
  );
};

export default CashbackTable;
