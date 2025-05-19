
// This file contains static broker data for fallback purposes
// Normally, brokers should be fetched from the API

export interface Broker {
  id: string;
  name: string;
  affiliateLink?: string;
}

export const brokersData: Broker[] = [
  {
    id: 'exness',
    name: 'Exness',
    affiliateLink: 'https://partner.exness.com/jaguarforex'
  },
  {
    id: 'roboforex',
    name: 'Roboforex',
    affiliateLink: 'https://my.roboforex.com/en/?a=jaguarforex'
  }
];

export default brokersData;
