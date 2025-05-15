
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
  affiliateLink?: string; // Optional affiliate link
  featured?: boolean;
}

export const brokersData: Broker[] = [
  {
    id: "exness",
    name: "Exness",
    logo: "https://d33vw3iu5hs0zi.cloudfront.net/media/logo_big_new_f7ebab0194.svg",
    rating: 4.7,
    accountTypes: [
      {
        name: "Standard",
        description: "$4.00 Per Lot"
      },
      {
        name: "Raw Spread",
        description: "$3.50 Per Lot"
      },
      {
        name: "Zero",
        description: "$1.50 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5"],
    paymentOptions: ["Monthly Cash Back"],
    featured: true
  },
  {
    id: "roboforex",
    name: "RoboForex",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN_DX_bdv6PwTaDmP76_9A0Jy7fx4Hl22Xg&s",
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
    paymentOptions: ["Direct to broker account (Daily)", "Monthly Cash Back"],
    affiliateLink: "https://my.roboforex.com/en/?a=ztwx"
  },
  {
    id: "fbs",
    name: "FBS",
    logo: "https://fbs.com/cabinet/assets/img/logo.svg",
    rating: 4.3,
    accountTypes: [
      {
        name: "Standard",
        description: "$3.50 Per Lot"
      },
      {
        name: "Micro",
        description: "$2.00 Per Lot"
      },
      {
        name: "Zero Spread",
        description: "$1.00 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5"],
    paymentOptions: ["Monthly Cash Back"],
    featured: true
  },
  {
    id: "icmarkets",
    name: "IC Markets",
    logo: "https://play-lh.googleusercontent.com/NQC5zyAMHoPDBDTcUqz-oGezCTU5Hj6kV7NL5bYgWV49wR9uXYEbZ8yL1YWaewW39rDI=w240-h480-rw",
    rating: 4.8,
    accountTypes: [
      {
        name: "Standard",
        description: "$7.00 Per Lot"
      },
      {
        name: "Raw Spread",
        description: ["$1.55 Per Lot +", "5% Direct Commission Reduction"]
      },
      {
        name: "cTrader",
        description: "$3.50 Per Lot"
      }
    ],
    platforms: ["MT4", "MT5", "cTrader"],
    paymentOptions: ["Monthly Cash Back - Real Time Reports"],
    featured: true
  },
  {
    id: "xm",
    name: "XM",
    logo: "https://cloud.xm-cdn.com/static/xm/common/logos/revamp/XM-logo.jpg",
    rating: 4.5,
    accountTypes: [
      {
        name: "Micro",
        description: "$2.5 Per Lot"
      },
      {
        name: "Standard",
        description: "$5 Per Lot"
      },
      {
        name: "XM Ultra Low",
        description: "$1.0 Per Lot"
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
