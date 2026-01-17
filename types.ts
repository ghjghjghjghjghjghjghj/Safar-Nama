
export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'SUV' | 'Sedan' | 'Luxury' | 'Sports' | 'Electric' | 'Hatchback';
  pricePerDay: number;
  image: string;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  fuel: string;
  rating: number;
  reviewCount: number;
  description: string;
  isPopular?: boolean;
}

export interface SearchFilters {
  query: string;
  type: string;
  maxPrice: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
