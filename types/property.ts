export interface Agent {
  id: string;
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  status: "For Sale" | "For Rent" | "Sold";
  type: "House" | "Apartment" | "Villa" | "Condo" | "Penthouse" | "Townhouse";
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSize?: string;
  images: string[];
  description: string;
  features: string[];
  featured?: boolean;
  agentId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
