
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
    logo: '/images/brokers/exness-logo.png',
    rating: 4.8,
    featured: true,
    affiliateLink: 'https://partner.exness.com/jaguarforex',
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
    logo: '/images/brokers/roboforex-logo.png',
    rating: 4.5,
    featured: false,
    affiliateLink: 'https://my.roboforex.com/en/?a=jaguarforex',
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
