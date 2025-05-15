
import { ReactNode } from "react";

export interface BrokerAccountType {
  name: string;
  description: string | string[];
}

export interface Broker {
  id: string;
  name: string;
  logo: string;
  rating: number;
  accountTypes: BrokerAccountType[];
  platforms: string[];
  paymentOptions: string[];
  featured?: boolean;
}

export const brokersData: Broker[] = [
  {
    id: "orbex",
    name: "Orbex",
    logo: "/images/brokers/orbex-logo.png",
    rating: 4.0,
    accountTypes: [
      {
        name: "Fixed",
        description: "$4.00 Per Lot"
      },
      {
        name: "Starter",
        description: "$3.50 Per Lot"
      },
      {
        name: "Premium",
        description: "$1.50 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5"],
    paymentOptions: ["Monthly Cash Back"],
    featured: true
  },
  {
    id: "pepperstone",
    name: "Pepperstone",
    logo: "/images/brokers/pepperstone-logo.png",
    rating: 4.9,
    accountTypes: [
      {
        name: "Standard",
        description: [
          "FX Majors: 0.24 Pips", 
          "FX Others: 0.30 Pips"
        ]
      },
      {
        name: "Razor",
        description: "12.85% Of Commissions Paid*"
      }
    ],
    platforms: ["MT4", "MT5", "cTrader"],
    paymentOptions: ["Direct to broker account (Daily)", "Monthly Cash Back"],
    featured: true
  },
  {
    id: "roboforex",
    name: "RoboForex",
    logo: "/images/brokers/roboforex-logo.png",
    rating: 4.2,
    accountTypes: [
      {
        name: "ProCent",
        description: "20% Of the Broker Revenue**"
      },
      {
        name: "Pro",
        description: "20% Of the Broker Revenue**"
      },
      {
        name: "ECN",
        description: "20% Of the Broker Revenue**"
      }
    ],
    platforms: ["MT4", "MT5", "cTrader", "R Trader"],
    paymentOptions: ["Direct to broker account (Daily)", "Monthly Cash Back"]
  },
  {
    id: "thinkmarkets",
    name: "ThinkMarkets",
    logo: "/images/brokers/thinkmarkets-logo.png",
    rating: 4.3,
    accountTypes: [
      {
        name: "Standard",
        description: "$3.64 Per Lot"
      },
      {
        name: "ThinkZero",
        description: "$1.50 Per Lot"
      },
      {
        name: "Standard ThinkTrader",
        description: "$3.32 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5", "ThinkTrader"],
    paymentOptions: ["Monthly Cash Back"],
    featured: true
  },
  {
    id: "tickmill",
    name: "Tickmill",
    logo: "/images/brokers/tickmill-logo.png",
    rating: 4.8,
    accountTypes: [
      {
        name: "Classic",
        description: "$7.75 Per Lot"
      },
      {
        name: "ECN Pro",
        description: ["$1.55 Per Lot +", "5% Direct Commission Reduction"]
      },
      {
        name: "VIP",
        description: "$1.55 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5"],
    paymentOptions: ["Monthly Cash Back - Real Time Reports"],
    featured: true
  },
  {
    id: "titanfx",
    name: "Titan FX",
    logo: "/images/brokers/titanfx-logo.png",
    rating: 3.9,
    accountTypes: [
      {
        name: "Zero Blade",
        description: "$0.9 Per Lot"
      },
      {
        name: "Zero Standard",
        description: "0.3 Pips"
      },
      {
        name: "Zero Micro",
        description: "0.36 Pips"
      }
    ],
    platforms: ["MT4", "MT5"],
    paymentOptions: ["Monthly Cash Back"]
  }
];

// Function to get all brokers
export const getBrokers = () => {
  return brokersData;
};

// Function to get a specific broker by ID
export const getBrokerById = (id: string): Broker | undefined => {
  return brokersData.find(broker => broker.id === id);
};
