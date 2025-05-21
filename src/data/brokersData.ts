
// This file contains static broker data for fallback purposes
// Normally, brokers should be fetched from the API

export interface Broker {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
  featured?: boolean;
  affiliateLink?: string;
  accountTypes?: Array<{
    name: string;
    description: string | string[];
  }>;
  platforms?: string[];
  paymentOptions?: string[];
}

export const brokersData: Broker[] = [
  {
    id: 'exness',
    name: 'Exness',
    logo: 'https://d33vw3iu5hs0zi.cloudfront.net/media/logo_big_new_f7ebab0194.svg',
    rating: 4.8,
    featured: true,
    affiliateLink: 'https://one.exnesstrack.org/a/tffad7az66',
    accountTypes: [
      {
        name: 'Standard',
        description: ['Spreads from 1.0 pips', 'Leverage up to 1:2000']
      },
      {
        name: 'Raw Spread',
        description: ['Spreads from 0.0 pips', 'Commission $3.5 per lot']
      },
      {
        name: 'Zero',
        description: ['Spreads from 0.0 pips', 'No commissions']
      }
    ],
    platforms: ['MT4', 'MT5', 'Web Terminal'],
    paymentOptions: ['Bank Transfer', 'Credit/Debit Cards', 'E-wallets', 'Cryptocurrency']
  },
  {
    id: 'roboforex',
    name: 'Roboforex',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN_DX_bdv6PwTaDmP76_9A0Jy7fx4Hl22Xg&s',
    rating: 4.5,
    featured: false,
    affiliateLink: 'https://my.roboforex.com/ph/?a=ztwx',
    accountTypes: [
      {
        name: 'Pro',
        description: ['Spreads from 0.8 pips', 'Leverage up to 1:500']
      },
      {
        name: 'ECN',
        description: ['Spreads from 0.1 pips', 'Commission $5 per lot']
      }
    ],
    platforms: ['MT4', 'MT5', 'R Trader'],
    paymentOptions: ['Bank Transfer', 'Credit/Debit Cards', 'E-wallets']
  },
  {
    id: 'fbs',
    name: 'FBS',
    logo: 'https://fbs.com/cabinet/assets/img/logo.svg',
    rating: 4.3,
    featured: false,
    affiliateLink: 'https://fbs.partners?ibl=586643&ibp=21023205',
    accountTypes: [
      {
        name: 'Standard',
        description: ['Spreads from 1.0 pips', 'Leverage up to 1:3000']
      },
      {
        name: 'Cent',
        description: ['Micro-lot trading', 'Low minimum deposit']
      }
    ],
    platforms: ['MT4', 'MT5', 'FBS Trader'],
    paymentOptions: ['Bank Transfer', 'Credit/Debit Cards', 'E-wallets', 'Local Payment Methods']
  },
  {
    id: 'icmarkets',
    name: 'ICMarkets',
    logo: 'https://play-lh.googleusercontent.com/NQC5zyAMHoPDBDTcUqz-oGezCTU5Hj6kV7NL5bYgWV49wR9uXYEbZ8yL1YWaewW39rDI=w240-h480-rw',
    rating: 4.7,
    featured: true,
    affiliateLink: 'https://icmarkets.com/?camp=56951',
    accountTypes: [
      {
        name: 'Raw Spread',
        description: ['Spreads from 0.0 pips', 'Commission $3.5 per lot']
      },
      {
        name: 'Standard',
        description: ['Spreads from 1.0 pips', 'No commission']
      }
    ],
    platforms: ['MT4', 'MT5', 'cTrader'],
    paymentOptions: ['Bank Transfer', 'Credit/Debit Cards', 'E-wallets', 'Cryptocurrency']
  },
  {
    id: 'xm',
    name: 'XM',
    logo: 'https://cloud.xm-cdn.com/static/xm/common/logos/revamp/XM-logo.jpg',
    rating: 4.6,
    featured: false,
    affiliateLink: 'https://clicks.pipaffiliates.com/c?c=576677&l=en&p=0',
    accountTypes: [
      {
        name: 'Micro',
        description: ['Spreads from 1.0 pips', 'Leverage up to 1:1000']
      },
      {
        name: 'Standard',
        description: ['Spreads from 1.0 pips', 'Leverage up to 1:1000']
      },
      {
        name: 'XM Ultra Low',
        description: ['Spreads from 0.0 pips', 'Commission $5 per lot']
      }
    ],
    platforms: ['MT4', 'MT5', 'XM WebTrader'],
    paymentOptions: ['Bank Transfer', 'Credit/Debit Cards', 'E-wallets', 'Local Payment Methods']
  }
];

// Function to get all brokers
export const getBrokers = (): Broker[] => {
  return brokersData;
};

// Function to find a broker by ID
export const getBrokerById = (id: string): Broker | null => {
  return brokersData.find(broker => broker.id === id) || null;
};

export default brokersData;
