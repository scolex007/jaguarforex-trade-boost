
import { Broker } from "@/data/brokersData";

interface BrokerHeaderProps {
  broker: Broker | null;
}

const BrokerHeader = ({ broker }: BrokerHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-8">
      {broker?.logo && (
        <div className="bg-white p-2 rounded w-12 h-12 flex items-center justify-center">
          <img 
            src={broker.logo} 
            alt={`${broker?.name} logo`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold">
        Setup cash back | <span className="text-jaguargold">{broker?.name}</span>
      </h1>
    </div>
  );
};

export default BrokerHeader;
