export interface TUsers {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
    // profile_image: string;
  }
   
  export interface TVehicle {
    id: number;
    rental_price: number;
    availability: boolean;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    seating_capacity: number;
    features: string;
    image_url: string;
    created_at?: Date;
    updated_at?: Date;
  } 